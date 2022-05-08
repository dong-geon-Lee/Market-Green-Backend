const asyncHandler = require("express-async-handler");
const Order = require("../models/order");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const orderUser = await Order.find({ userId: req.params.id });

  res.status(200).json(orderUser);
});

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const newOrder = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createOrder = await newOrder.save();

  res.status(201).json(createOrder);
});

const updateOrdeer = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getOrders, getOrder, addOrder, updateOrdeer, deleteOrder };
