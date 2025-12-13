exports.getAllCategories = async (req, res) => {
  try {
    const categories = await req.prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    console.log(req.body);
    const category = await req.prisma.category.create({
      data: { category_name, description },
    });
    res.json({ "Created category": category });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await req.prisma.category.findUnique({
      where: { category_id: Number(id) },
    });
    if (!category) throw new Error("Category not found");
    res.json(category);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = await req.prisma.category.update({
      where: { category_id: Number(id) },
      data: req.body,
    });
    if (!updatedCategory) throw new Error("Failed to update category");
    res.json({ "Updateed category": updatedCategory });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.category.delete({
      where: { category_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};
