const asyncHandler = require("express-async-handler");
const Order = require("../models/order");

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

  console.log(req.user._id, "h");

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
  console.log(createOrder, "hey");
  res.status(201).json(createOrder);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  res.status(200).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});

const orderPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
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

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  updateOrdeer,
  deleteOrder,
  orderPay,
};
