const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: String,
  flight: String,
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
