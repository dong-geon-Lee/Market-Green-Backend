const routers = require("express").Router();
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");
const { tokenAuthorization } = require("../middleware/verifyToken");

routers.get("/", getUsers);
routers.post("/login", loginUser);
routers.post("/register", registerUser);

routers.route("/:id", tokenAuthorization).put(updateUser).delete(deleteUser);

module.exports = routers;
