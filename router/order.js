const express = require('express')
const Router = express.Router()
const authUser = require('../middleware/authuser')
const {orders,fetchSuccessfullOrders,paymentVerification} = require('../controller/order-controller')

Router.post('/orders',orders)
Router.get('/fetchorders',authUser,fetchSuccessfullOrders)
Router.post('/verifypayment',paymentVerification)
module.exports = Router