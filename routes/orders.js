const router = require("express").Router();
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrdeer,
  deleteOrder,
  orderPay,
} = require("../controllers/orders");
const { protect } = require("../middleware/verifyToken");

router.get("/", protect, getOrders);
router.post("/", protect, addOrder);
router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, orderPay);
// router.route("/", protect).get(getOrders).post(addOrder);
// router
//   .route("/:id")
//   .get(protect, getOrder)
//   .put(updateOrdeer)
//   .delete(deleteOrder);

module.exports = router;
