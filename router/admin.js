const express = require('express')
const Router = express.Router()
// const authUser = require('../middleware/authuser')
const {adminLogin} = require('../controller/admin-controller')


Router.post('/adminlogin',adminLogin)


module.exports = Router