const MyError = require("../services/myError");

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await req.prisma.worker.findMany();
    if (!workers) throw new MyError("Workers not found", 404);
    res.json(workers);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.createWorker = async (req, res) => {
  try {
    const { worker_role, first_name, last_name, phone_number } = req.body;
    if (!worker_role || !first_name || !last_name || !phone_number)
      throw new Error("Enter all required fields!", 400);
    const worker = await req.prisma.worker.create({
      data: { worker_role, first_name, last_name, phone_number },
    });
    if (!worker) throw new MyError("Failed to create worker", 500);
    res.status(201).json({ "Created worker": worker });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.getWorker = async (req, res) => {
  try {
    const id = req.params.id;
    const worker = await req.prisma.worker.findUnique({
      where: { worker_id: Number(id) },
    });
    if (!worker) throw new MyError("Worker not found", 404);
    res.json(worker);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.updateWorker = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorker = await req.prisma.worker.update({
      where: { worker_id: Number(id) },
      data: req.body,
    });
    if (!updatedWorker) throw new MyError("Failed to update worker", 500);
    res.json({ "Updateed worker": updatedWorker });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.worker.delete({
      where: { worker_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};
