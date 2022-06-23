const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createReview,
  deleteReview,
  getReviews,
} = require("../controllers/products");

const { tokenAdmin, protect } = require("../middleware/verifyToken");
const router = require("express").Router();
const upload = require("../middleware/multerUpload");

router.get("/", getProducts);
router.get("/review/:id", getReviews);
router.delete("/review/:id", deleteReview);
router.get("/:id", getProduct);
router.post("/", tokenAdmin, upload.single("img"), setProduct);
router.post("/:id/review", protect, createReview);
router.put("/:id", tokenAdmin, upload.single("img"), updateProduct);
router.delete("/:id", tokenAdmin, upload.single("img"), deleteProduct);

module.exports = router;
