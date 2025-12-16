const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllReviews = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    repository.getAll("review", {
      skip: skip,
      take: limit,
    }),
    repository.count("review"),
  ]);
  if (!reviews) throw new MyError("Reviews not found", 404);
  return {
    data: reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.createReview = async (body) => {
  const { rating, comment, product_id, client_id } = body;
  if (!rating || !comment || !product_id || !client_id)
    throw new MyError("Enter all required fields!", 400);

  const review = await repository.create("review", {
    rating,
    comment,
    product_id,
    client_id,
  });
  if (!review) throw new MyError("Failed to create review", 500);
  return review;
};

exports.getReview = async (id) => {
  const review = await repository.getOne("review", {
    review_id: Number(id),
  });
  if (!review) throw new MyError("Review not found", 404);
  return review;
};

exports.updateReview = async (id, body) => {
  const updatedReview = await repository.update(
    "review",
    { review_id: Number(id) },
    body
  );
  if (!updatedReview) throw new MyError("Failed to update review", 500);
  return updatedReview;
};

exports.deleteReview = async (id) => {
  await repository.delete("review", { review_id: Number(id) });
};
