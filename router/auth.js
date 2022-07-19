const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Router = express.Router()
const authUser = require('../middleware/authuser')
const {signUp,signIn,changePassword,userDetails} = require('../controller/auth-controller')


Router.post('/signup',signUp)
Router.post('/signin',signIn)
Router.post('/changepassword',authUser,changePassword)
Router.get('/userdetails',authUser,userDetails)

module.exports = Router