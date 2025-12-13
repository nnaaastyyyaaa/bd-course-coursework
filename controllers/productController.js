exports.getAllProducts = async (req, res) => {
  try {
    const products = await req.prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(505).json({ error: error.message });
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
    res.json({ "Created product": product });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await req.prisma.product.findUnique({
      where: { product_id: Number(id) },
    });
    if (!product) throw new Error("Product not found");
    res.json(product);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await req.prisma.product.update({
      where: { product_id: Number(id) },
      data: req.body,
    });
    if (!updatedProduct) throw new Error("Failed to update product");
    res.json({ "Updateed product": updatedProduct });
  } catch (error) {
    res.status(505).json({ error: error.message });
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
    res.status(505).json({ error: error.message });
  }
};
