exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await req.prisma.shipment.findMany();
    res.json(shipments);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getShipment = async (req, res) => {
  try {
    const id = req.params.id;
    const shipment = await req.prisma.shipment.findUnique({
      where: { shipment_id: Number(id) },
    });
    if (!shipment) throw new Error("shipment not found");
    res.json(shipment);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updateShipment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedShipment = await req.prisma.shipment.update({
      where: { shipment_id: Number(id) },
      data: req.body,
    });
    if (!updatedShipment) throw new Error("Failed to update shipment");
    res.json({ "Updateed shipment": updatedShipment });
  } catch (error) {
    res.status(505).json({ error: error.message });
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
    res.status(505).json({ error: error.message });
  }
};
