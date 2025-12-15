const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Check order constraints", async () => {
  await expect(
    prisma.orders.create({
      data: {
        order_date: new Date("2025-10-01"),
        order_price: -1,
        status: "confirmed",
        discount: -1,
        client_id: 1,
        address_id: 1,
        worker_id: 3,
      },
    })
  ).rejects.toThrow();
});

test("Check order constraints", async () => {
  await expect(
    prisma.orders.create({
      data: {
        order_date: new Date("2025-10-01"),
        order_price: -1,
        status: "confirmed",
        discount: 101,
        client_id: 1,
        address_id: 1,
        worker_id: 3,
      },
    })
  ).rejects.toThrow();
});

test("Check order constraints", async () => {
  const order = await prisma.orders.create({
    data: {
      order_date: new Date("2025-10-01"),
      order_price: 12400,
      status: "confirmed",
      discount: 55,
      client_id: 1,
      address_id: 1,
      worker_id: 3,
    },
  });

  expect(order.order_price).toBeDefined();
  expect(order.order_price).toBe(12400);
  expect(order.discount).toBeDefined();
  expect(order.discount).toBe(55);
});

test("Check product constraints", async () => {
  await expect(
    prisma.product.create({
      data: {
        product_name: 'Смартфон "Galaxy S30"',
        price: -1,
        quantity: 0,
        description: "Флагманський смартфон з покращеною камерою",
        stock_status: "in_stock",
        category_id: 1,
      },
    })
  ).rejects.toThrow();
});

test("Check product constraints", async () => {
  const product = await prisma.product.create({
    data: {
      product_name: 'Смартфон "Galaxy S30"',
      price: 12300,
      quantity: 40,
      description: "Флагманський смартфон з покращеною камерою",
      stock_status: "in_stock",
      category_id: 1,
    },
  });

  expect(product.price).toBeDefined();
  expect(product.price).toBe(12300);
  expect(product.quantity).toBeDefined();
  expect(product.quantity).toBe(40);
});
