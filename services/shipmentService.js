const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllShipments = async () => {
  const shipments = await repository.getAll("shipment");
  if (!shipments) throw new MyError("Shipments not found", 404);
  return shipments;
};

exports.getShipment = async (id) => {
  const shipment = await repository.getOne("shipment", {
    shipment_id: Number(id),
  });
  if (!shipment) throw new MyError("Shipment not found", 404);
  return shipment;
};

exports.updateShipment = async (id, body) => {
  if ("order_id" in body) throw new MyError("You can`t update order_id", 400);
  const updatedShipment = await repository.update(
    "shipment",
    { shipment_id: Number(id) },
    body
  );
  if (!updatedShipment) throw new MyError("Failed to update shipment", 500);
  return updatedShipment;
};

exports.deleteShipment = async (id) => {
  await repository.delete("shipment", { shipment_id: Number(id) });
};
