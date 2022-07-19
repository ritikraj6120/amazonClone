const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
	item: {
		type: Schema.Types.ObjectId,
		ref: 'items'
	},
	quantity:{
		type: Number,
		required:true
	}
});
const Stocks = mongoose.model('stocks', StockSchema);
module.exports = Stocks;