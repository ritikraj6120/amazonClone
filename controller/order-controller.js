const Orders = require("../models/Order");
const Stocks = require("../models/Stock");
const Items = require("../models/Items");
const OrderItem = require("../models/OrderItem");
const Basket = require("../models/Basket");
const User = require("../models/User");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const { KEY_ID, KEY_SECRET } = process.env;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const conn = require("../db");

const CLIENT_EMAIL = process.env.CLIENT_EMAIL; //your email from where you'll be sending emails to users
const CLIENT_ID = process.env.CLIENT_ID; // Client ID generated on Google console cloud
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Client SECRET generated on Google console cloud
const REDIRECT_URI = process.env.REDIRECT_URI; // The OAuth2 server (playground)
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // The refreshToken we got from the the OAuth2 playground

const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    secure: false,
});

const razorpay = new Razorpay({
    // Replace with your key_id
    key_id: KEY_ID,
    // Replace with your key_secret
    key_secret: KEY_SECRET,
});

const InitiateOrder = async (req, res) => {
    const basketDict = req.body.items;

    try {
        for (let itemId in basketDict) {
            const stock = await Stocks.findOne({ item: itemId });
            if (basketDict[itemId] > stock.quantity) {
                const item = await Items.findById(itemId).select("title");
                let errorMessage = `Ordered Quantity exceeded for Item ${item.title}`;
                throw new Error(errorMessage);
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json(error.message);
    }

    const payment_capture = 1;
    const amount = req.body.amount;
    let z = amount * 100;
    const currency = "INR";
    const options = {
        amount: z,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        // Create a new Order
        let totalItems = 0;
        for (let itemId in basketDict) {
            totalItems += basketDict[itemId];
        }
        const order = await Orders.create({
            user: req.userId,
            amount: amount,
            order_id: response.id,
            status: response.status,
            totalItems,
        });
        let orderId = order._id;
        for (let ItemId in basketDict) {
            await OrderItem.create({
                orderId: orderId,
                itemId: ItemId,
                quantity: basketDict[ItemId],
            });
        }
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send("Unable to create order");
    }
};

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    // Pass yours key_secret here
    const key_secret = process.env.KEY_SECRET;

    // STEP 8: Verification & Send Response to User
    try {
        // Creating hmac object
        let hmac = crypto.createHmac("sha256", key_secret);

        // Passing the data to be hashed
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        // Creating the hmac in the required format
        const generated_signature = hmac.digest("hex");
        if (razorpay_signature === generated_signature) {
            //updating the order
            console.log("inside sucess verification");
            await Orders.findOneAndUpdate(
                { order_id: razorpay_order_id, user: req.userId },
                { status: "captured", date: Date.now() },
                { new: true }
            );
            await Stocks.findOneAndUpdate(
                { item: itemId },
                {
                    $inc: {
                        quantity: -1 * basketDict[itemId],
                    },
                }
            );
            return res
                .status(200)
                .json({ success: true, message: "Payment has been verified" });
        } else {
            console.log("inside failure verification");
            await Orders.findOneAndUpdate(
                { order_id: razorpay_order_id, user: req.userId },
                { status: "failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server errror");
    }
};

const fetchSuccessfullOrders = async (req, res) => {
    try {
        let successfullOrder = await Orders.findOne({
            order_id: req.params.id,
            user: req.userId,
        }).select("amount date");
        let successFullOrderId = successfullOrder._id;
        let orderItems = await OrderItem.find({ orderId: successFullOrderId });
        let itemDict = {};
        for (let i = 0; i < orderItems.length; i++) {
            const singleItemId = orderItems[i].itemId;
            const quantity = orderItems[i].quantity;
            itemDict[singleItemId] = quantity;
        }
        let items = [];
        for (let i = 0; i < orderItems.length; i++) {
            const singleItemId = orderItems[i].itemId;
            let singleItem = await Items.findById(singleItemId);
            items.push(singleItem);
        }
        return res.json({ items, itemDict });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

const fetchOrdersHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        let totalEntries = await Orders.countDocuments({
            user: req.userId,
            status: "captured",
        }).exec();
        let totalPages = Math.ceil(totalEntries / limit);
        results.totalPages = totalPages;
        const orders = await Orders.find({
            user: req.userId,
            status: "captured",
        })
            .sort({ date: "desc" })
            .limit(limit)
            .skip(startIndex)
            .exec();

        let temp = [];
        for (let j = 0; j < orders.length; j++) {
            let successFullOrderId = orders[j]._id;
            let orderItems = await OrderItem.find({
                orderId: successFullOrderId,
            });
            // let itemDict = {};
            // for (let i = 0; i < orderItems.length; i++) {
            //     const singleItemId = orderItems[i].itemId;
            //     const quantity = orderItems[i].quantity;
            //     itemDict[singleItemId] = quantity;
            // }
            let items = [];
            for (let i = 0; i < orderItems.length; i++) {
                const singleItemId = orderItems[i].itemId;
                let singleItem = await Items.findById(singleItemId);
                items.push(singleItem);
            }
            temp.push({
                _id: orders[j]._id,
                order_id: orders[j].order_id,
                amount: orders[j].amount,
                date: orders[j].date,
                totalItems: orders[j].totalItems,
                items,
                // itemDict,
            });
            // results.orders[j].items = itemsInfoArray;
            // return res.json({ items, itemDict });

            // let itemIdArray = singleOrder.items;
            // delete results.orders[j].items;
            // let itemsInfoArray = [];
            // for (let i = 0; i < itemIdArray.length; i++) {
            //     let id = itemIdArray[i];
            //     const singleItem = await Items.findById(id);
            //     itemsInfoArray.push(singleItem);
            // }
            // results.orders[j].items = itemsInfoArray;
        }
        results.orders = temp;
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

const fetchSingleOrderHistory = async (req, res) => {
    try {
        const order = await Orders.findOne({
            user: req.userId,
            order_id: req.query.orderId,
            status: "captured",
        });
        let successFullOrderId = order._id;
        let orderItems = await OrderItem.find({
            orderId: successFullOrderId,
        });
        let itemDict = {};
        for (let i = 0; i < orderItems.length; i++) {
            const singleItemId = orderItems[i].itemId;
            const quantity = orderItems[i].quantity;
            itemDict[singleItemId] = quantity;
        }
        let items = [];
        for (let i = 0; i < orderItems.length; i++) {
            const singleItemId = orderItems[i].itemId;
            let singleItem = await Items.findById(singleItemId);
            items.push(singleItem);
        }
        let results = {
            _id: order._id,
            amount: order.amount,
            date: order.date,
            items,
            itemDict,
        };
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

// function paginatedResults(model) {
//     return async (req, res, next) => {
//         const page = parseInt(req.query.page);
//         const limit = 5

//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;

//         const results = {};
//         const totalPages = await model.countDocuments().exec();
//         results.totalPages = totalPages;
//         // if (endIndex < totalPages) {
//         //     results.next = {
//         //         page: page + 1,
//         //         limit: limit,
//         //     };
//         // }

//         // if (page > 0) {
//         //     results.previous = {
//         //         page: page - 1,
//         //         limit: limit,
//         //     };
//         // }
//         try {
//             results.items = await model
//                 .find()
//                 .limit(limit)
//                 .skip(startIndex)
//                 .exec();
//             res.paginatedResults = results;
//             next();
//         } catch (e) {
//             res.status(500).json({ message: e.message });
//         }
//     };
// }

const paymentVerificationUsingWebhook = async (req, res) => {
    const SECRET = process.env.WEBHOOK_SECRET;
    const crypto = require("crypto");
    const shasum = crypto.createHmac("sha256", SECRET);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("req is legit");
        require("fs").writeFileSync(
            "payment.json",
            JSON.stringify(req.body, null, 4)
        );
        const accessToken = await OAuth2Client.getAccessToken();
        // Create the email envelope (transport)
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: CLIENT_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const order_id = req.body.payload.payment.entity.order_id;
        const orderId = await Orders.findOne({ order_id }).select(
            "_id user totalItems amount"
        );
        const paymentId = req.body.payload.payment.entity.id;
        const orderItems = await OrderItem.find({
            orderId: orderId._id,
        }).select("itemId quantity");
        let userId = orderId.user;
        const user = await User.findById(userId);
        if (req.body.event === "payment.failed") {
            try {
                let mailOptions = {
                    from: CLIENT_EMAIL,
                    to: user.email,
                    subject: `Transaction Failed for Order No ${order_id} containing ${orderId.totalItems} items Worth of Rs ${orderId.amount}`,
                    text: req.body.payload.payment.entity.error_description,
                };
                transport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(info);
                    }
                });
            } catch (err) {
                console.log(err);
            }
            return res.json({ status: "ok" });
        }

        let basketDict = {};
        for (let i = 0; i < orderItems.length; i++) {
            basketDict[orderItems[i].itemId] = orderItems[i].quantity;
        }
        // code for payment revert back because stock gets over
        let moneyRevertBack = false;
        for (let itemId in basketDict) {
            const stock = await Stocks.findOne({ item: itemId }).select(
                "quantity"
            );
            if (basketDict[itemId] > stock.quantity) {
                moneyRevertBack = true;
                break;
            }
        }
        if (moneyRevertBack) {
            // write code for reverting back money in customers account
            console.log("refunding process starts");
            razorpay.payments.refund(paymentId, {
                speed: "optimum",
            });
            await Orders.findOneAndUpdate(
                { order_id: order_id },
                { status: "refunded", date: Date.now() },
                { new: true }
            );
        } else {
            await Orders.findOneAndUpdate(
                { order_id: order_id },
                { status: "captured", date: Date.now() },
                { new: true }
            );
            for (let itemId in basketDict) {
                await Stocks.findOneAndUpdate(
                    { item: itemId },
                    {
                        $inc: {
                            quantity: -1 * basketDict[itemId],
                        },
                    }
                );
            }
            let userId = orderId.user;
            await Basket.findOneAndDelete({ userId });
            const user = await User.findById(userId);
            try {
                let mailOptions = {
                    from: CLIENT_EMAIL,
                    to: user.email,
                    subject: `Order Receipt for Order No ${order_id} containing ${orderId.totalItems} items Worth of Rs ${orderId.amount}`,
                    text: "you have successfully ordered your items. Will reach at your doorsteps within 3 days",
                };
                transport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(info);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
    res.json({ status: "ok" });
};

const lll = async (req, res) => {
    const accessToken = await OAuth2Client.getAccessToken();

    // Create the email envelope (transport)
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: CLIENT_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
    let mailOptions = {
        from: CLIENT_EMAIL,
        to: "2019ucp1691@mnit.ac.in",
        subject: "Order Receipt for ritik",
        text: "you have successfully ordered your items. will reach at your doorsteps within 3 days",
    };
    console.log("jjjjj");
    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            // console.log(info);
        }
    });
    return res.status(200).json("ok");
};

module.exports = {
    InitiateOrder,
    fetchSuccessfullOrders,
    paymentVerification,
    fetchOrdersHistory,
    fetchSingleOrderHistory,
    paymentVerificationUsingWebhook,
    lll,
};
