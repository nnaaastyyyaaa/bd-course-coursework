const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllAddresses = async () => {
  const addresses = await repository.getAll("address");
  if (!addresses) throw new MyError("Addresses not found", 404);
  return addresses;
};

exports.getAddress = async (id) => {
  const address = await repository.getOne("address", {
    address_id: Number(id),
  });
  if (!address) throw new MyError("Address not found", 404);
  return address;
};

exports.updateAddress = async (id, body) => {
  const updatedAddress = await repository.update(
    "address",
    { address_id: Number(id) },
    body
  );
  if (!updatedAddress) throw new MyError("Failed to update address", 500);
  return updatedAddress;
};

exports.deleteAddress = async (id) => {
  await repository.delete("address", { address_id: Number(id) });
};
