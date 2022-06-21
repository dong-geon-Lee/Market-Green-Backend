const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const CryptoJS = require("crypto-js");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  console.log(userExists, "중복");

  if (userExists) {
    res.status(400);
    throw new Error("이미 존재하는 유저입니다");
  }

  const user = await User.create({
    name,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SECRET
    ).toString(),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("유저 데이터가 유효하지 않습니다");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("비회원 또는 잘못된 E-mail입니다.");
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  );

  const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (originPassword !== req.body.password) {
    res.status(404);
    throw new Error("잘못된 비밀번호입니다");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    accessToken: generateToken(user._id),
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const users = await User.find();

  const userIdList = users
    .map((userList) => userList.email)
    .find((e) => e === req.body.email);

  if (userIdList) {
    res.status(404);
    throw new Error("이미 존재하는 유저입니다. 프로필 변경이 불가능합니다.");
  }

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  const { _doc } = newUser;

  res.status(200).json({ ..._doc, accessToken: generateToken(user.id) });
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const singleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  singleUser,
};
