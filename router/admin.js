const express = require('express')
const Router = express.Router()
const authAdmin = require('../middleware/authadmin')
const {adminLogin} = require('../controller/admin-controller')
const {adminAddNewProduct}=require('../controller/admin-controller')

Router.post('/adminlogin',adminLogin)
Router.post('/adminaddnewproduct',authAdmin,adminAddNewProduct);

module.exports = Router