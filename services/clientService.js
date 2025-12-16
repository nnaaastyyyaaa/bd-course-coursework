const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllClients = async () => {
  const clients = await repository.getAll("client");
  if (!clients) throw new MyError("Clients not found", 404);
  return clients;
};

exports.createClient = async (body) => {
  const { client_name, last_name, email, phone_number } = body;
  if (!client_name || !last_name || !email || !phone_number)
    throw new MyError("Enter all required fields!", 400);
  const user = await repository.create("client", {
    client_name,
    last_name,
    email,
    phone_number,
  });
  if (!user) throw new MyError("Failed to create client", 500);
  return user;
};

exports.getClient = async (id) => {
  const client = await repository.getOne("client", {
    client_id: Number(id),
  });
  if (!client) throw new MyError("Client not found", 404);
  return client;
};

exports.updateClient = async (id, body) => {
  const updatedClient = await repository.update(
    "client",
    { client_id: Number(id) },
    body
  );
  if (!updatedClient) throw new MyError("Failed to update client", 500);
  return updatedClient;
};

exports.deleteClient = async (id) => {
  await repository.delete("client", { client_id: Number(id) });
};
