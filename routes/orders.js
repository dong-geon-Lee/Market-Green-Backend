const router = require("express").Router();
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrdeer,
  deleteOrder,
} = require("../controllers/orders");
const { protect } = require("../middleware/verifyToken");

router.route("/", protect).get(getOrders).post(addOrder);
router.route("/:id").get(getOrder).put(updateOrdeer).delete(deleteOrder);

module.exports = router;
