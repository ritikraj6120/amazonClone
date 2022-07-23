const express = require('express')
const Router = express.Router()
const authUser = require('../middleware/authuser')
const {orders,fetchSuccessfullOrders,paymentVerification, fetchProductById} = require('../controller/order-controller')

Router.post('/orders',orders)
Router.get('/fetchorders/:id',authUser,fetchSuccessfullOrders)
Router.post('/verifypayment',authUser,paymentVerification)
Router.get('/fetchproductbyid/:id',fetchProductById)
module.exports = Router