const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  reviewProduct,
  deleteReview,
} = require("../controllers/products");

const { tokenAdmin, protect } = require("../middleware/verifyToken");
const router = require("express").Router();
const upload = require("../middleware/multerUpload");

router.get("/", getProducts);
router.get("/:id", protect, getProduct);
router.post("/", tokenAdmin, upload.single("img"), setProduct);
router.post("/:id/review", protect, reviewProduct);
router.delete("/:id/review/:reviewId", protect, deleteReview);
router.put("/:id", tokenAdmin, upload.single("img"), updateProduct);
router.delete("/:id", tokenAdmin, upload.single("img"), deleteProduct);

module.exports = router;
