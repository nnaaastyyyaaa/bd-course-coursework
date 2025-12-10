const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", clientController.getAllClients);
router.post("/client", clientController.createClient);
module.exports = router;
router.get("/:id", clientController.getClient);
router.patch("/update/:id", clientController.updateClient);
router.delete("/delete/:id", clientController.deleteClient);
