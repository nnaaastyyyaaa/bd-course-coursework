const MyError = require("../services/myError");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await req.prisma.category.findMany();
    if (!categories) throw new MyError("Categories not found", 404);
    res.json(categories);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name || !description)
      throw new MyError("Enter all required fields!", 400);
    const category = await req.prisma.category.create({
      data: { category_name, description },
    });
    if (!category) throw new MyError("Failed to create category", 500);
    res.status(201).json({ "Created category": category });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await req.prisma.category.findUnique({
      where: { category_id: Number(id) },
    });
    if (!category) throw new MyError("Category not found", 404);
    res.json(category);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = await req.prisma.category.update({
      where: { category_id: Number(id) },
      data: req.body,
    });
    if (!updatedCategory) throw new MyError("Failed to update category", 500);
    res.json({ "Updateed category": updatedCategory });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
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
    res.status(error.status || 505).json({ error: error.message });
  }
};
