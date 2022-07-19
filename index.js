const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
// connectToMongo();
const app = express()
var port = process.env.PORT || 5000
app.use(express.json())
// Available Routes
//app.use('/auth', require('./router/auth'));

app.post('/verifypayment',(req,res)=>{
	console.log(req);
})
app.listen(port, () => {
	console.log(`Amazon backend is listening at http://localhost:${port}`)
})