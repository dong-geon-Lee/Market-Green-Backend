const routers = require("express").Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users");

routers.route("/").get(getUsers).post(postUser);
routers.route("/:id").put(putUser).delete(deleteUser);

module.exports = routers;
