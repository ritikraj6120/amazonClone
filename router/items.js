const express = require('express')
const Router = express.Router()
const {fetchItems} = require('../controller/items-controller')
// const authUser = require('../middleware/authuser')
Router.get('/fetchitems',fetchItems)

module.exports = Router