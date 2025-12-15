const MyError = require("../services/myError");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await req.prisma.review.findMany();
    if (!reviews) throw new MyError("Reviews not found", 404);
    res.json(reviews);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { rating, comment, product_id, client_id } = req.body;
    if (!rating || !comment || !product_id || !client_id)
      throw new MyError("Enter all required fields!", 400);
    const review = await req.prisma.review.create({
      data: {
        rating,
        comment,
        product_id,
        client_id,
      },
    });
    if (!review) throw new MyError("Failed to create review", 500);
    res.status(201).json({ "Created review": review });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await req.prisma.review.findUnique({
      where: { review_id: Number(id) },
    });
    if (!review) throw new MyError("Review not found", 404);
    res.json(review);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedReview = await req.prisma.review.update({
      where: { review_id: Number(id) },
      data: req.body,
    });
    if (!updatedReview) throw new MyError("Failed to update review", 500);
    res.json({ "Updateed review": updatedReview });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.review.delete({
      where: { review_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
