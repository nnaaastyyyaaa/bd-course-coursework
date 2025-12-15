const MyError = require("../services/myError");

exports.getAllClients = async (req, res) => {
  try {
    const users = await req.prisma.client.findMany();
    if (!users) throw new MyError("Users not found", 404);
    res.json(users);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { client_name, last_name, email, phone_number } = req.body;
    if (!client_name || !last_name || !email || !phone_number)
      throw new MyError("Enter all required fields!", 400);
    const user = await req.prisma.client.create({
      data: { client_name, last_name, email, phone_number },
    });
    if (!user) throw new MyError("Failed to create client", 500);
    res.status(201).json({ "Created client": user });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await req.prisma.client.findUnique({
      where: { client_id: Number(id) },
    });
    if (!client) throw new MyError("Client not found", 404);
    res.json(client);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedClient = await req.prisma.client.update({
      where: { client_id: Number(id) },
      data: req.body,
    });
    if (!updatedClient) throw new MyError("Failed to update client", 500);
    res.json({ "Updateed client": updatedClient });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.client.delete({
      where: { client_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
