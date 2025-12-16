const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    repository.getAll("product", {
      skip: skip,
      take: limit,
    }),
    repository.count("product"),
  ]);
  if (!products) throw new MyError("Products not found", 404);
  return {
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.createProduct = async (body) => {
  const { product_name, price, quantity, description, image_url, category_id } =
    body;

  if (
    !product_name ||
    !price ||
    !quantity ||
    !description ||
    !category_id ||
    !image_url
  )
    throw new MyError("Enter all required fields!", 400);

  const product = await repository.create("product", {
    product_name,
    price,
    quantity,
    description,
    image_url,
    category_id,
  });
  if (!product) throw new MyError("Failed to create product", 500);
  return product;
};

exports.getProduct = async (id) => {
  const product = await repository.getOne("product", {
    product_id: Number(id),
  });
  if (!product) throw new MyError("Product not found", 404);
  return product;
};

exports.updateProduct = async (id, body) => {
  const updatedProduct = await repository.update(
    "product",
    { product_id: Number(id) },
    body
  );
  if (!updatedProduct) throw new MyError("Failed to update product", 500);
  return updatedProduct;
};

exports.deleteProduct = async (id) => {
  await repository.delete("product", { product_id: Number(id) });
};
