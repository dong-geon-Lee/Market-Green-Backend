const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

const setProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    categories: req.body.categories,
    img: req.file?.filename,
    inStock: req.body.inStock,
  });

  res.status(200).json(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(newProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
