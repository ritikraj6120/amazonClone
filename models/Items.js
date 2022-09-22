const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
	adminId:{
		type: Schema.Types.ObjectId,
		ref: 'admins'
	},
	adminName:{
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required : true,
		default:0
	},
	description:{
		type:String,
		required : true
	},
	category:{
		type:String,
		required : true
	}
});
const Items = mongoose.model('items', ItemsSchema);
module.exports = Items;
