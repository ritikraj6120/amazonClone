const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
 connectToMongo();
const app = express()
var port = process.env.PORT || 5000
// app.use(function (req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', '*');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	next();
// });
app.use(cors({
	credentials: true, 
	origin:'http://localhost:3000',

}));

// const corsOptions = {
// 	origin: true, //included origin as true
// 	credentials: true, //included credentials as true
// };
app.use(express.json())
// Available Routes
app.use('/', require('./router/auth'));
app.use('/', require('./router/items'));
app.use('/',require('./router/order'));
// app.use(cors())

app.post('/verifypayment',(req,res)=>{
	console.log(req);
})
app.listen(port, () => {
	console.log(`Amazon backend is listening at http://localhost:${port}`)
})