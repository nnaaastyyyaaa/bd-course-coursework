const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tables = [
  "order_item",
  "payment",
  "shipment",
  "orders",
  "address",
  "product",
  "review",
  "client",
  "worker",
  "category",
];
async function clearDatabase() {
  for (const table of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
    );
  }

  console.log("Test database reset complete!");
}

module.exports = clearDatabase;
