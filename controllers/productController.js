const MyError = require("../services/myError");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await req.prisma.product.findMany();
    if (!products) throw new MyError("Products not found", 404);
    res.json(products);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      product_name,
      price,
      quantity,
      description,
      image_url,
      category_id,
    } = req.body;

    if (
      !product_name ||
      !price ||
      !quantity ||
      !description ||
      !category_id ||
      !image_url
    )
      throw new MyError("Enter all required fields!", 400);

    const product = await req.prisma.product.create({
      data: {
        product_name,
        price,
        quantity,
        description,
        image_url,
        category_id,
      },
    });
    if (!product) throw new MyError("Failed to create product", 500);
    res.status(201).json({ "Created product": product });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await req.prisma.product.findUnique({
      where: { product_id: Number(id) },
    });
    if (!product) throw new MyError("Product not found", 404);
    res.json(product);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await req.prisma.product.update({
      where: { product_id: Number(id) },
      data: req.body,
    });
    if (!updatedProduct) throw new MyError("Failed to update product", 500);
    res.json({ "Updateed product": updatedProduct });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.product.delete({
      where: { product_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
