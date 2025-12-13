const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.patch("/update/:id", orderController.updateOrderStatus);
router.delete("/delete/:id", orderController.deleteOrder);
router.post("/add-item", orderController.addOrderItem);

module.exports = router;
