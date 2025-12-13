const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

router.get("/", shipmentController.getAllShipments);
router.get("/:id", shipmentController.getShipment);
router.patch("/update/:id", shipmentController.updateShipment);
router.delete("/delete/:id", shipmentController.deleteShipment);

module.exports = router;
