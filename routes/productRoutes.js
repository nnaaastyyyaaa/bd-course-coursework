const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post("/product", productController.createProduct);
router.get("/:id", productController.getProduct);
router.patch("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
