const express = require("express");
const Router = express.Router();
const authUser = require("../middleware/authuser");
const {
    InitiateOrder,
    fetchSuccessfullOrders,
    paymentVerification,
    fetchOrdersHistory,
    fetchSingleOrderHistory,
	paymentVerificationUsingWebhook,
	lll,
} = require("../controller/order-controller");

Router.post("/make_order", authUser, InitiateOrder);
Router.get("/fetchorders/:id", authUser, fetchSuccessfullOrders);
Router.post("/verifypayment", authUser, paymentVerification);
Router.get("/fetchorders_history/", authUser, fetchOrdersHistory);
Router.get("/fetchSingleOrderHistory/", authUser, fetchSingleOrderHistory);
Router.post("/verifypaymentusingwebhook",  paymentVerificationUsingWebhook);
Router.get("/test",lll)

module.exports = Router;
// https://704e-210-212-97-174.in.ngrok.io/verifypaymentusingwebhook