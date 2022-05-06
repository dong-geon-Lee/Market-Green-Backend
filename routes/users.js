const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

const routers = require("express").Router();
const { verifyToken, tokenAdmin } = require("../middleware/verifyToken");

// 나중에 Get 요청 admin 추가하기
routers.get("/", tokenAdmin, getUsers);
routers.post("/login", loginUser);
routers.post("/register", registerUser);
routers.put("/:id", verifyToken, updateUser);
routers.delete("/:id", verifyToken, deleteUser);

module.exports = routers;
