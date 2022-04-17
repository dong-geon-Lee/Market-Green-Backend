const User = require("../models/users");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const postUser = asyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = await user.save();

  res.status(200).json(newUser);
});

const putUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  !user && res.status(400).json({ message: "Not found user email." });

  const newUser = await User.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(newUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findOneAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "add email or password" });
  }

  const user = await User.findOne({ email: req.body.email });
  console.log(user, "조회");
  !user && res.status(400).json({ message: "Not found user email." });

  if (user.password !== req.body.password) {
    return res.status(400).json({ message: "Password not correct!" });
  }

  res.status(200).json(user);
});

module.exports = { getUsers, postUser, putUser, deleteUser, loginUser };
