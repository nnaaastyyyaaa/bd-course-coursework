const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllAddresses = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [addresses, total] = await Promise.all([
    repository.getAll("address", {
      skip: skip,
      take: limit,
    }),
    repository.count("address"),
  ]);
  if (!addresses) throw new MyError("Addresses not found", 404);
  return {
    data: addresses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
