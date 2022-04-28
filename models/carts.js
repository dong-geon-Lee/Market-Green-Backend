const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    products: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        inStock: { type: Number, required: true },
        img: { type: String, required: true },
        categories: { type: String, required: true },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
