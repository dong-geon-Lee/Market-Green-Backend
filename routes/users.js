const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

const routers = require("express").Router();
const { tokenAuthorization } = require("../middleware/verifyToken");

// 나중에 Get 요청 admin 추가하기
routers.get("/", getUsers);
routers.post("/login", loginUser);
routers.post("/register", registerUser);

routers.route("/:id", tokenAuthorization).put(updateUser).delete(deleteUser);

module.exports = routers;
