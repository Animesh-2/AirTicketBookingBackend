const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO_URL);
console.log("connected to mongoDB successfully");

module.exports = connection;
