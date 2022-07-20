const express = require('express')
const Router = express.Router()
const {fetchItems} = require('../controller/items-controller')

Router.get('/fetchitems',fetchItems)

module.exports = Router