exports.getAllClients = async (req, res) => {
  const users = await req.prisma.client.findMany();
  res.json(users);
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
    res.status(500).json({ error: error.message });
  }
};
