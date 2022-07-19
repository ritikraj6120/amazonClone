const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const connectToMongo = () => {
	mongoose.connect(MONGO_URI)
	mongoose.connection.on('connected', () => {
		console.log("Connected to mongo")
	})
	mongoose.connection.on('error', (err) => {
		console.log('err ', err)
	})
}

module.exports = connectToMongo;