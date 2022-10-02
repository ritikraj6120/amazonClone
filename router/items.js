const express = require('express')
const Router = express.Router()
const {fetchItems,fetchProductById,addStocksToItems,addItemToBasket,removeFromBasket,getItemFromBasket,emptyItemsFromBasket} = require('../controller/items-controller')
const authUser = require('../middleware/authuser')
Router.get('/fetchitems',fetchItems)
Router.get("/fetchproductbyid/:id", fetchProductById)
Router.post('/addstockstoitems',addStocksToItems)
Router.post('/additemtobasket',authUser,addItemToBasket)
Router.post('/removeitemfrombasket',authUser,removeFromBasket)
Router.get('/getitemfrombasket',authUser,getItemFromBasket)
Router.post('/emptyitemsfrombasket',authUser,emptyItemsFromBasket)
module.exports = Router