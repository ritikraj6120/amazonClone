const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},

});
const Admins = mongoose.model('admins', AdminSchema);
module.exports = Admins;