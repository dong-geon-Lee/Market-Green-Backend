const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  singleUser,
} = require("../controllers/users");

const router = require("express").Router();
const { protect, tokenAdmin } = require("../middleware/verifyToken");

// 나중에 Get 요청 admin 추가하기
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", tokenAdmin, getUsers);
router.get("/:id", protect, singleUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
