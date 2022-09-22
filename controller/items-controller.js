const Item = require("../models/Items");
const Basket = require("../models/Basket");
const fetchItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const addItemToBasket = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const userId = req.userId;
        let bucketQuatity = await Basket.findOne({
            userId: userId,
            itemId: itemId,
        });
        if (bucketQuatity === null) {
            await Basket.updateOne(
                { userId: userId, itemId: itemId },
                { quantity: 1 },
                { upsert: true }
            );
        } else {
            await Basket.updateOne(
                { userId: userId, itemId: itemId },
                { quantity: bucketQuatity.quantity + 1 },
                { upsert: true }
            );
        }

        res.status(200).send("Item added to basket successfully");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};
const removeFromBasket = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const userId = req.userId;
        let bucketQuatity = await Basket.findOne({
            userId: userId,
            itemId: itemId,
        });
        if (bucketQuatity.quantity === 1) {
            await Basket.findOneAndDelete({ userId: userId, itemId: itemId });
        } else {
            await Basket.updateOne(
                { userId: userId, itemId: itemId },
                { quantity: bucketQuatity.quantity - 1 }
            );
        }
        // await Basket.updateOne(
        //     { user: req.userId },
        //     { $pull: { items: itemId } }
        // );
        res.status(200).send("Item removed from basket successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
const getItemFromBasket = async (req, res) => {
    const userId = req.userId;
    try {
        let bucketQuatity = await Basket.find({ userId: userId }).select(
            "itemId quantity"
        );
        let basket = [];
        let basketDict = {};
        for (let i = 0; i < bucketQuatity.length; i++) {
            const itemId = bucketQuatity[i].itemId;
            const quantity = bucketQuatity[i].quantity;
            basketDict[itemId] = quantity;
            let item = await Item.findById(itemId);
            let newItem = {
                id: item._id,
                title: item.title,
                image: item.image,
                price: item.price,
                rating: item.rating,
                description: item.description,
                category: item.category,
            };
            basket.push(newItem);
        }
        res.json({ basket, basketDict });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const emptyItemsFromBasket = async (req, res) => {
    const userId = req.userId;
    try {
        await Basket.deleteMany({ userId: userId });
		res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    fetchItems,
    addItemToBasket,
    removeFromBasket,
    getItemFromBasket,
    emptyItemsFromBasket,
};
