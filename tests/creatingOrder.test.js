const request = require("supertest");
const app = require("../app");
const { seed } = require("../seed");
const clearDB = require("./clearDB");

beforeAll(async () => {
  await clearDB();
  await seed();
});
test("Creating order", async () => {
  const response = await request(app)
    .post("/api/orders/create")
    .send({
      client_id: 1,
      address: {
        country: "Ukraine",
        city: "Vinnitsa",
        street: "Some street",
        postal_code: "12345",
      },
      items: [
        {
          quantity: 3,
          product_id: 1,
        },
        {
          quantity: 1,
          product_id: 3,
        },
      ],
      payment_method: "online",
      carrier: "Нова Пошта",
      worker_id: 3,
    });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("Created order");
  const result = response.body["Created order"];
  expect(result.order).toHaveProperty("order_price");
  expect(result.payment).toHaveProperty("payment_date");
  expect(result.payment).toHaveProperty("payment_status");
  expect(result.shipment).toHaveProperty("shipping_date");
  expect(result.shipment).toHaveProperty("shipment_status");
});
