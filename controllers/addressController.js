const addressService = require("../services/addressService");

exports.getAllAddresses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const addresses = await addressService.getAllAddresses(page, limit);
    res.json(addresses);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await addressService.getAddress(id);
    res.json(address);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAddress = await addressService.updateAddress(id, req.body);
    res.json({ "Updateed address": updatedAddress });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    await addressService.deleteAddress(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
