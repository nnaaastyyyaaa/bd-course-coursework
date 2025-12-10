exports.getAllClients = async (req, res) => {
  try {
    const users = await req.prisma.client.findMany();
    res.json(users);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { client_name, last_name, email, phone_number } = req.body;
    console.log(req.body);
    const user = await req.prisma.client.create({
      data: { client_name, last_name, email, phone_number },
    });
    res.json({ "Created client": user });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await req.prisma.client.findUnique({
      where: { client_id: Number(id) },
    });
    if (!client) throw new Error("Client not found");
    res.json(client);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedClient = await req.prisma.client.update({
      where: { client_id: Number(id) },
      data: req.body,
    });
    if (!updatedClient) throw new Error("Failed to update client");
    res.json({ "Updateed client": updatedClient });
  } catch (error) {
    res.status(505).json({ error: error.message });
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
    res.status(505).json({ error: error.message });
  }
};
