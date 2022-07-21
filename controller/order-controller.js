const Orders = require('../models/Order')
const shortid = require("shortid");
const Razorpay = require("razorpay");
const {KEY_ID,KEY_SECRET} = process.env;

const razorpay = new Razorpay({
	// Replace with your key_id
	key_id: KEY_ID,
	// Replace with your key_secret
	key_secret: KEY_SECRET,
});


const orders = async (req,res)=>{
	// return res.json("sucess");
	const payment_capture = 1;
	const amount = req.body.amount;
	const currency = "INR";

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};
				
	try {
		const response = await razorpay.orders.create(options);
		// Create a new Order
		const order = await Orders.create({
				user: req.userId,
				amount: amount*100,
				order_id:response.id,
				status:response.status,
				items:req.body.items
			});
		console.log(response);
		res.status(200).json({
				id: response.id,
				currency: response.currency,
				amount: response.amount,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send('Unable to create order');
	}         
}

const fetchSuccessfullOrders= async (req, res) => {
	try {
			let successfullOrders=await Orders.find({ status: { $eq: 'success' } }).exec();
			return res.status(200).json(successfullOrders);
		}catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error" );
		}
};

const paymentVerification = async (req,res)=>{
		// do a validation
		// const secret = '12345678'
	
		// console.log(req.body)
	
		// const crypto = require('crypto')
	
		// const shasum = crypto.createHmac('sha256', secret)
		// shasum.update(JSON.stringify(req.body))
		// const digest = shasum.digest('hex')
	
		// console.log(digest, req.headers['x-razorpay-signature'])
	
		// if (digest === req.headers['x-razorpay-signature']) {
		// 	console.log('request is legit')
		// 	// process it
		// 	require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
		// } else {
		// 	// pass it
		// }
		// res.json({ status: 'ok' })
}
module.exports={orders,fetchSuccessfullOrders,paymentVerification}