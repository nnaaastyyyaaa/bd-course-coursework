const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.get("/", addressController.getAllAddresses);
router.get("/:id", addressController.getAddress);
router.patch("/update/:id", addressController.updateAddress);
router.delete("/delete/:id", addressController.deleteAddress);

module.exports = router;
