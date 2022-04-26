const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../frontend/public/"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

const router = require("express").Router();

router.route("/").get(getProducts).post(upload.single("img"), setProduct);
router
  .route("/:id")
  .put(upload.single("img"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
