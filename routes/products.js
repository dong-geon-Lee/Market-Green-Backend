const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = require("express").Router();

router.route("/").get(getProducts).post(setProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
