const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Check worker constraints", async () => {
  await expect(
    prisma.worker.create({
      data: {
        worker_role: "nnone",
        first_name: "Oleh",
        last_name: "Melnyk",
        phone_number: "+380933333334",
      },
    })
  ).rejects.toThrow();
});

test("Check worker constraints", async () => {
  const worker = await prisma.worker.create({
    data: {
      worker_role: "operator",
      first_name: "Oleh",
      last_name: "Melnyk",
      phone_number: "+380933333334",
    },
  });

  expect(worker).toBeDefined();
  expect(worker.worker_role).toBe("operator");
});

test("Check order constraints", async () => {
  await expect(
    prisma.orders.create({
      data: {
        order_date: new Date("2025-10-01"),
        order_price: 12400,
        status: "none",
        discount: 5,
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
      discount: 5,
      client_id: 1,
      address_id: 1,
      worker_id: 3,
    },
  });

  expect(order).toBeDefined();
  expect(order.status).toBe("confirmed");
});

test("Check product constraints", async () => {
  await expect(
    prisma.product.create({
      data: {
        product_name: 'Смартфон "Galaxy S30"',
        price: 29999,
        quantity: 50,
        description: "Флагманський смартфон з покращеною камерою",
        stock_status: "none",
        category_id: 1,
      },
    })
  ).rejects.toThrow();
});

test("Check product constraints", async () => {
  const product = await prisma.product.create({
    data: {
      product_name: 'Смартфон "Galaxy S30"',
      price: 29999,
      quantity: 50,
      description: "Флагманський смартфон з покращеною камерою",
      stock_status: "in_stock",
      category_id: 1,
    },
  });

  expect(product).toBeDefined();
  expect(product.stock_status).toBe("in_stock");
});

test("Check payment constraints", async () => {
  await expect(
    prisma.payment.create({
      data: {
        payment_method: "none",
        payment_status: "paid",
        price: 12400,
        order_id: 1,
      },
    })
  ).rejects.toThrow();
});

test("Check payment constraints", async () => {
  await expect(
    prisma.payment.create({
      data: {
        payment_method: "by_card",
        payment_status: "none",
        price: 12400,
        order_id: 1,
      },
    })
  ).rejects.toThrow();
});
test("Check payment constraints", async () => {
  await expect(
    prisma.payment.create({
      data: {
        payment_method: "none",
        payment_status: "none",
        price: 12400,
        order_id: 1,
      },
    })
  ).rejects.toThrow();
});

test("Check payment constraints", async () => {
  const payment = await prisma.payment.create({
    data: {
      payment_method: "by_card",
      payment_status: "paid",
      price: 12400,
      order_id: 1,
    },
  });

  expect(payment).toBeDefined();
  expect(payment.payment_status).toBe("paid");
  expect(payment.payment_method).toBe("by_card");
});
