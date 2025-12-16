const clientService = require("../services/clientService");

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const user = await clientService.createClient(req.body);
    res.status(201).json({ "Created client": user });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await clientService.getClient(id);
    res.json(client);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedClient = await clientService.updateClient(id, req.body);
    res.json({ "Updated client": updatedClient });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    await clientService.deleteClient(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
