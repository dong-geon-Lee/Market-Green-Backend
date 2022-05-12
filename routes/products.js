const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  reviewProduct,
} = require("../controllers/products");

const { tokenAdmin, protect } = require("../middleware/verifyToken");
const router = require("express").Router();
const upload = require("../middleware/multerUpload");

router.get("/", getProducts);
router.get("/:id", tokenAdmin, getProduct);
router.post("/", tokenAdmin, upload.single("img"), setProduct);
router.post("/:id/review", protect, reviewProduct);
router.put("/:id", tokenAdmin, upload.single("img"), updateProduct);
router.delete("/:id", tokenAdmin, upload.single("img"), deleteProduct);

module.exports = router;
