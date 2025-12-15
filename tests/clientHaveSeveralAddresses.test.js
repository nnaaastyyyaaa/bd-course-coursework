const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Client can have several addresses", async () => {
  const addresses = await prisma.address.findMany({
    where: { client_id: 2 },
  });

  expect(addresses.length).toBeGreaterThanOrEqual(1);
});
