const reviewService = require("../services/reviewService");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    if (!reviews) throw new MyError("Reviews not found", 404);
    res.json(reviews);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json({ "Created review": review });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewService.getReview(id);
    res.json(review);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedReview = await reviewService.updateReview(id, req.body);
    res.json({ "Updated review": updatedReview });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await reviewService.deleteReview(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
