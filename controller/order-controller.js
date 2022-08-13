const Orders = require("../models/Order");
const Items = require("../models/Items");
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

const orders = async (req, res) => {
  // return res.json("sucess");
  const payment_capture = 1;
  const amount = req.body.amount;
  let z=amount*100;
  z=Math.floor( z );
  console.log("z is",z);
  console.log(amount)
  console.log(typeof amount)
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
    const order = await Orders.create({
      user: req.userId,
      amount: amount * 100,
      order_id: response.id,
      status: response.status,
      items: req.body.items,
    });
    // console.log("response is ",response);
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
        { order_id: razorpay_order_id },
        { status: "captured" },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Payment has been verified" });
    } else {
      console.log("inside failure verification");
      await Orders.findOneAndUpdate(
        { order_id: razorpay_order_id },
        { status: "failed" },
        { new: true }
      );
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server errror");
  }
};

const fetchSuccessfullOrders = async (req, res) => {
  try {
    let successfullOrders = await Orders.findOne({
      order_id: req.params.id,
    }).exec();
    let itemsArray = successfullOrders.items;
		let itemsInfoArray=[]
		for(let i=0;i<itemsArray.length;i++){
			let id=itemsArray[i];
			const singleItem = await Items.findById(id);
			itemsInfoArray.push(singleItem);
		}
    return res.status(200).json(itemsInfoArray);
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





module.exports = { orders, fetchSuccessfullOrders, paymentVerification ,fetchProductById};
