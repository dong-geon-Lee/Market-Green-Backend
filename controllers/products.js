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

const reviewProduct = asyncHandler(async (req, res) => {
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

    const newProduct = await product.save();

    res.status(201).json(newProduct);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  // await Product.findByIdAndDelete({
  //   _id: req.params.id,
  //   reviews: [{ _id: req.params.reviewId }],
  // });
  // res.status(200).json({ id: req.params.reviewId });
});

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  reviewProduct,
  updateProduct,
  deleteProduct,
  deleteReview,
};
