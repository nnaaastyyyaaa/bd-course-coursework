const MyError = require("../services/myError");

exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await req.prisma.shipment.findMany();
    if (!shipments) throw new MyError("Shipments not found", 404);
    res.json(shipments);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getShipment = async (req, res) => {
  try {
    const id = req.params.id;
    const shipment = await req.prisma.shipment.findUnique({
      where: { shipment_id: Number(id) },
    });
    if (!shipment) throw new MyError("Shipment not found", 404);
    res.json(shipment);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateShipment = async (req, res) => {
  try {
    const id = req.params.id;
    if ("order_id" in req.body)
      throw new MyError("You can`t update order_id", 400);
    const updatedShipment = await req.prisma.shipment.update({
      where: { shipment_id: Number(id) },
      data: req.body,
    });
    if (!updatedShipment) throw new MyError("Failed to update shipment", 500);
    res.json({ "Updateed shipment": updatedShipment });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteShipment = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.shipment.delete({
      where: { shipment_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
