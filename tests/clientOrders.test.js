const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Client can have more than one order", async () => {
  const orders = await prisma.orders.findMany({
    where: { client_id: 5 },
  });

  expect(orders.length).toBeGreaterThanOrEqual(1);
});
