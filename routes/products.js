const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const upload = require("../middleware/multerUpload");
const router = require("express").Router();

router.route("/").get(getProducts).post(upload.single("img"), setProduct);
router
  .route("/:id")
  .put(upload.single("img"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
