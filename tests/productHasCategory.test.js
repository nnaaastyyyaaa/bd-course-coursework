const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Each product has category", async () => {
  const products = await prisma.product.findMany({
    take: 10,
    include: { category: true },
  });

  for (const product of products) {
    expect(product.category).toBeDefined();
    expect(product.category).not.toBeNull();
    expect(
      Array.isArray(product.category) ? product.category.length : 1
    ).toBeGreaterThan(0);
  }
});
