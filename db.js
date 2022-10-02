const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

// const connectToMongo = () => {
    mongoose.connect(MONGO_URI);
	const conn = mongoose.connection;
    conn.on("connected", () => {
        console.log("Connected to mongo");
    });
    conn.on("error", (err) => {
        console.log("err ", err);
    });
    // return mongoose.connection;
// };

module.exports = conn;

// const conn = require("../models/connection");
// const User = require("../models/user.model");
// const ShippingAddress = require("../models/address.model");

// const register = async () => {
//     try {
//         const session = await conn.startSession();
//         await session.withTransaction(async () => {
//             const user = await User.create(
//                 [
//                     {
//                         name: "Van Helsing",
//                     },
//                 ],
//                 { session }
//             );

//             await ShippingAddress.create(
//                 [
//                     {
//                         address: "Transylvania",
//                         user_id: user.id,
//                     },
//                 ],
//                 { session }
//             );

//             return user;
//         });
//         session.endSession();

//         console.log("success");
//     } catch (error) {
//         console.log("error");
//     }
// };
