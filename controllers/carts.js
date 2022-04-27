const asyncHandler = require("express-async-handler");
const Cart = require("../models/carts");

const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();

  res.status(200).json(carts);
});

const getCart = asyncHandler(async (req, res) => {
  const cartUser = await Cart.find({ userId: req.params.id });

  res.status(200).json(cartUser);
});

const addCart = asyncHandler(async (req, res) => {
  const carts = new Cart(req.body);

  const newCarts = await carts.save();

  res.status(200).json(newCarts);
});

const updateCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

const deleteCart = asyncHandler(async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getCarts, getCart, addCart, updateCart, deleteCart };
