const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

router.get("/", workerController.getAllWorkers);
router.post("/worker", workerController.createWorker);
router.get("/:id", workerController.getWorker);
router.patch("/update/:id", workerController.updateWorker);
router.delete("/delete/:id", workerController.deleteWorker);

module.exports = router;
