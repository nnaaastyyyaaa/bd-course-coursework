const { seed } = require("../seed");
const clearDB = require("./clearDB");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  await clearDB();
  await seed();
});

test("Each order has shipment and payment", async () => {
  const orders = await prisma.$queryRaw`SELECT * FROM orders o 
  LEFT  JOIN shipment s 
  on o.order_id = s.order_id
  LEFT JOIN payment p
  on o.order_id = p.order_id
  LIMIT 10`;

  console.log(orders);
  for (const order of orders) {
    expect(order.shipment_id).toBeDefined();
    expect(order.shipment_id).not.toBeNull();
    expect(order.payment_id).toBeDefined();
    expect(order.payment_id).not.toBeNull();
  }
});
