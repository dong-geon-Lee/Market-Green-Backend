const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const CryptoJS = require("crypto-js");

const registerUser = asyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  const newUser = await user.save();

  res.status(200).json(newUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  !user && res.status(400).json({ message: "Not found user email." });

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  );

  const password = hashedPassword.toString(CryptoJS.enc.Utf8);

  console.log(hashedPassword, "암호화 -> 복호화");
  console.log(password, "인코딩 -> 문자열");

  if (password !== req.body.password) {
    return res.status(400).json("Wrong password!");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  const user = await User.findOne({ email: req.body.email });

  !user && res.status(400).json({ message: "Not found user email." });

  const newUser = await User.findOneAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(newUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findOneAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

module.exports = { getUsers, registerUser, updateUser, deleteUser, loginUser };
