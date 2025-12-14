const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getAllReviews);
router.post("/review", reviewController.createReview);
router.get("/:id", reviewController.getReview);
router.patch("/update/:id", reviewController.updateReview);
router.delete("/delete/:id", reviewController.deleteReview);

module.exports = router;
