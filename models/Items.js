const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required : true
	},
});
const Items = mongoose.model('items', ItemsSchema);
module.exports = Items;
