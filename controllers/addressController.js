exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await req.prisma.address.findMany();
    res.json(addresses);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await req.prisma.address.findUnique({
      where: { address_id: Number(id) },
    });
    if (!address) throw new Error("Address not found");
    res.json(address);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAddress = await req.prisma.address.update({
      where: { address_id: Number(id) },
      data: req.body,
    });
    if (!updatedAddress) throw new Error("Failed to update address");
    res.json({ "Updateed address": updatedAddress });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.address.delete({
      where: { address_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};
