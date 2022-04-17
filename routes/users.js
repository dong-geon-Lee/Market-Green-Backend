const routers = require("express").Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

routers.route("/").get(getUsers).post(postUser);
routers.route("/:id").put(putUser).delete(deleteUser);
routers.post("/login", loginUser);

module.exports = routers;
