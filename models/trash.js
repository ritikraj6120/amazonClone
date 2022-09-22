const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	items:[{
		type: Schema.Types.ObjectId,
		ref: 'items'
	}]
});
const Basket = mongoose.model('baskets', OrderSchema);
module.exports = Basket;