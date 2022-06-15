const router = require("express").Router();
const {
  getOrders,
  getOrder,
  addOrder,
  orderPay,
} = require("../controllers/orders");
const { protect } = require("../middleware/verifyToken");

router.get("/", protect, getOrders);
router.post("/", protect, addOrder);
router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, orderPay);

module.exports = router;
