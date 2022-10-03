const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
