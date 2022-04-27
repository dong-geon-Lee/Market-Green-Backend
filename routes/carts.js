const router = require("express").Router();
const {
  getCarts,
  addCart,
  updateCart,
  deleteCart,
  getCart,
} = require("../controllers/carts");

router.route("/").get(getCarts).post(addCart);
router.route("/:id").get(getCart).put(updateCart).delete(deleteCart);

module.exports = router;
