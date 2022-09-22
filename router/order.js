const express = require("express");
const Router = express.Router();
const authUser = require("../middleware/authuser");
const {
    InitiateOrder,
    fetchSuccessfullOrders,
    paymentVerification,
    fetchProductById,
    fetchOrdersHistory,
    fetchSingleOrderHistory,
} = require("../controller/order-controller");

Router.post("/make_order", authUser, InitiateOrder);
Router.get("/fetchorders/:id", authUser, fetchSuccessfullOrders);
Router.post("/verifypayment", authUser, paymentVerification);
Router.get("/fetchproductbyid/:id", fetchProductById);
Router.get("/fetchorders_history/", authUser, fetchOrdersHistory);
Router.get("/fetchSingleOrderHistory/", authUser, fetchSingleOrderHistory);
module.exports = Router;
