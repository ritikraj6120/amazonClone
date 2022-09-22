const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    amount: {
        type: Number,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
    },
    status: {
        // created,paid,failed
        type: String,
        required: true,
    },
	totalItems:{
		type:Number,
		required:true
	},
    // items: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "items",
    //     },
    // ],
	date:{
		type:Date,
		default: Date.now()
	},
});
OrderSchema.index({ user: 1, order_id: 1 }, { unique: true });
const Orders = mongoose.model("orders", OrderSchema);
module.exports = Orders;
