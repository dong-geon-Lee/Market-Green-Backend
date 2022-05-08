const router = require("express").Router();
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrdeer,
  deleteOrder,
} = require("../controllers/orders");

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").get(getOrder).put(updateOrdeer).delete(deleteOrder);

module.exports = router;
