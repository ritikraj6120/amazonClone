const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "orders",
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "items",
    },
    quantity: {
        type: Number,
        required: true,
    },
});

OrderItemSchema.index({ orderId: 1, itemId: 1 }, { unique: true });
const OrderItem = mongoose.model("orderItems", OrderItemSchema);
module.exports = OrderItem;
