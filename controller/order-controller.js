const Orders = require("../models/Order");
const Items = require("../models/Items");
const OrderItem = require("../models/OrderItem");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const { KEY_ID, KEY_SECRET } = process.env;
const crypto = require("crypto");

const razorpay = new Razorpay({
    // Replace with your key_id
    key_id: KEY_ID,
    // Replace with your key_secret
    key_secret: KEY_SECRET,
});

const InitiateOrder = async (req, res) => {
    // return res.json("sucess");
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
        const basketDict = req.body.items;
        let totalItems = 0;
        for (let itemId in basketDict) {
            totalItems += basketDict[ItemId];
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

// const fetchSuccessfullOrders= async (req, res) => {
// 	try {
// 			let successfullOrders=await Orders.find({ status: { $eq: 'success' } }).exec();
// 			return res.status(200).json(successfullOrders);
// 		}catch (error) {
// 			console.error(error.message);
// 			res.status(500).send("Internal Server Error" );
// 		}
// };

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

const fetchProductById = async (req, res) => {
    try {
        // console.log(req.params.id)
        let successfullOrders = await Items.findById({
            _id: req.params.id,
        }).exec();
        // console.log(successfullOrders)
        return res.status(200).json(successfullOrders);
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
				order_id:orders[j].order_id,
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
		console.log("heelo")
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

module.exports = {
    InitiateOrder,
    fetchSuccessfullOrders,
    paymentVerification,
    fetchProductById,
    fetchOrdersHistory,
    fetchSingleOrderHistory,
};
