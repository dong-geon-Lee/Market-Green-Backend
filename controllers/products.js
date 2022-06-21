const Product = require("../models/product");

const asyncHandler = require("express-async-handler");
const fileSizeFormatter = require("../utils/imageSize");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

const setProduct = asyncHandler(async (req, res) => {
  console.log(req.file, "잇니?");
  const newProduct = await Product.create({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    img: req.file.path,
    inStock: req.body.inStock,
  });

  res.status(200).json(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!req.file) res.send("please img add");
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        img: req.file.path,
        inStock: req.body.inStock,
      },
    },
    { new: true }
  );

  res.status(200).json(newProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already Reviewed");
    }

    console.log(req.user, "name");
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Reviewed Added" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.updateMany(
    {
      "reviews._id": { $in: req.params.id },
    },
    {
      $pull: { reviews: { _id: { $in: req.params.id } } },
    }
  );

  res.status(200).json(product);
});

const getReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product.reviews.rating);
});

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  createReview,
  updateProduct,
  deleteProduct,
  deleteReview,
  getReviews,
};
