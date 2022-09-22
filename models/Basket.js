// this is much more better many to many it follows
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BasketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
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
BasketSchema.index({ userId: 1, itemId: 1 }, { unique: true });

const Basket = mongoose.model("baskets", BasketSchema);
module.exports = Basket;
