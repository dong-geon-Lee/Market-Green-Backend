const routers = require("express").Router();
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

routers.get("/", getUsers);
routers.post("/login", loginUser);
routers.post("/register", registerUser);

routers.route("/:id").put(updateUser).delete(deleteUser);

module.exports = routers;
