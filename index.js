const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
var port = process.env.PORT || 5000
app.use(express.json())
// Available Routes
app.use('/auth', require('./routes/auth'));


app.listen(port, () => {
	console.log(`Khatabook backend listening at http://localhost:${port}`)
})