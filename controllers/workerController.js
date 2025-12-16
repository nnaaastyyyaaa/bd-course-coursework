const workerService = require("../services/workerService");

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllWorkers();
    res.json(workers);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createWorker = async (req, res) => {
  try {
    const worker = await workerService.createWorker(req.body);
    res.status(201).json({ "Created worker": worker });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getWorker = async (req, res) => {
  try {
    const id = req.params.id;
    const worker = await workerService.getWorker(id);
    res.json(worker);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateWorker = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorker = await workerService.updateWorker(id, req.body);
    res.json({ "Updated worker": updatedWorker });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const id = req.params.id;
    await workerService.deleteWorker(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
