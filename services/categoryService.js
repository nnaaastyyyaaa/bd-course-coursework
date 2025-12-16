const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllCategories = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    repository.getAll("category", {
      skip: skip,
      take: limit,
    }),
    repository.count("category"),
  ]);
  if (!categories) throw new MyError("Categories not found", 404);
  return {
    data: categories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.createCategory = async (body) => {
  const { category_name, description } = body;
  if (!category_name || !description)
    throw new MyError("Enter all required fields!", 400);
  const category = await repository.create("category", {
    category_name,
    description,
  });
  if (!category) throw new MyError("Failed to create category", 500);
  return category;
};

exports.getCategory = async (id) => {
  const category = await repository.getOne("category", {
    category_id: Number(id),
  });
  if (!category) throw new MyError("Category not found", 404);
  return category;
};

exports.updateCategory = async (id, body) => {
  const updatedCategory = await repository.update(
    "category",
    { category_id: Number(id) },
    body
  );
  if (!updatedCategory) throw new MyError("Failed to update category", 500);
  return updatedCategory;
};

exports.deleteCategory = async (id) => {
  await repository.delete("category", { category_id: Number(id) });
};
