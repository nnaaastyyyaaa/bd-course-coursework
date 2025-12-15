const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Check email constraints", async () => {
  await expect(
    prisma.client.create({
      data: {
        client_name: "Test",
        last_name: "Test",
        email: "testexample.com",
        phone_number: "+380501234567",
      },
    })
  ).rejects.toThrow();
});

test("Check email constraints", async () => {
  await expect(
    prisma.client.create({
      data: {
        client_name: "Test",
        last_name: "Test",
        email: "test@examplecom",
        phone_number: "+380501234567",
      },
    })
  ).rejects.toThrow();
});

test("Check email constraints", async () => {
  await expect(
    prisma.client.create({
      data: {
        client_name: "Test",
        last_name: "Test",
        email: "testexamplecom",
        phone_number: "+380501234567",
      },
    })
  ).rejects.toThrow();
});

test("Check email constraints", async () => {
  const email = await prisma.client.create({
    data: {
      client_name: "Test",
      last_name: "Test",
      email: "test@example.com",
      phone_number: "+380501234567",
    },
  });

  expect(client).toBeDefined();
  expect(client.email).toBe("test@example.com");
});
