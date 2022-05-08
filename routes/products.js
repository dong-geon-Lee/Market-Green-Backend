const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/products");

const { tokenAdmin } = require("../middleware/verifyToken");
const router = require("express").Router();
const upload = require("../middleware/multerUpload");

router.get("/", getProducts);
router.get("/:id", tokenAdmin, getProduct);
router.post("/", tokenAdmin, upload.single("img"), setProduct);
router.put("/:id", tokenAdmin, upload.single("img"), updateProduct);
router.delete("/:id", tokenAdmin, upload.single("img"), deleteProduct);

module.exports = router;
