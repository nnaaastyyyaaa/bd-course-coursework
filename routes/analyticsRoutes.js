const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get(
  "/cities-avg-sum-per-client-over/:number",
  analyticsController.getCitiesAvgSumPerClientOver
);

router.get(
  "/client-avg-price-greater",
  analyticsController.getClientAvgPriceGreater
);

router.get(
  "/client-total-spent-over/:number",
  analyticsController.getClientTotalSpentOver
);

module.exports = router;
