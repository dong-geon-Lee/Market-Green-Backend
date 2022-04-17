const User = require("../models/users");

const getUsers = (req, res) => {
  res.status(200).json("Hello World! hey!");
};

const postUser = (req, res) => {
  res.status(200).json("Hello World! hey1!");
};

const putUser = (req, res) => {
  res.status(200).json("Hello World! he2y!");
};

const deleteUser = (req, res) => {
  res.status(200).json("Hello World! he3y!");
};

module.exports = { getUsers, postUser, putUser, deleteUser };
