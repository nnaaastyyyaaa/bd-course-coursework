const shipmentService = require("../services/shipmentService");

exports.getAllShipments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const shipments = await shipmentService.getAllShipments(page, limit);
    res.json(shipments);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getShipment = async (req, res) => {
  try {
    const id = req.params.id;
    const shipment = await shipmentService.getShipment(id);
    res.json(shipment);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateShipment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedShipment = await shipmentService.updateShipment(id, req.body);
    res.json({ "Updated shipment": updatedShipment });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteShipment = async (req, res) => {
  try {
    const id = req.params.id;
    await shipmentService.deleteShipment(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
