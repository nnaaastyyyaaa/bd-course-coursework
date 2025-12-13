const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPayment);
router.patch("/update/:id", paymentController.updatePayment);
router.delete("/delete/:id", paymentController.deletePayment);

module.exports = router;
