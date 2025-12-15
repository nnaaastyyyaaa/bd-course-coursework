const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.client.createMany({
    data: [
      {
        client_name: "Ivan",
        last_name: "Petrenko",
        email: "ivan.petrenko@example.com",
        phone_number: "+380501234567",
      },
      {
        client_name: "Olga",
        last_name: "Shevchenko",
        email: "olga.shev@example.com",
        phone_number: "+380671112233",
      },
      {
        client_name: "Maksym",
        last_name: "Bondar",
        email: "maks.bondar@example.com",
        phone_number: "+380931234567",
      },
      {
        client_name: "Anna",
        last_name: "Kowalska",
        email: "anna.kowalska@example.com",
        phone_number: "+48501122334",
      },
      {
        client_name: "Peter",
        last_name: "Schmidt",
        email: "peter.schmidt@example.com",
        phone_number: "+4915112345678",
      },
    ],
  });
  await prisma.address.createMany({
    data: [
      {
        country: "Ukraine",
        city: "Kyiv",
        street: "Shevchenka 12",
        postal_code: "01001",
        client_id: 1,
      },
      {
        country: "Ukraine",
        city: "Lviv",
        street: "Franko 3",
        postal_code: "79000",
        client_id: 4,
      },
      {
        country: "Ukraine",
        city: "Odessa",
        street: "Deribasivska 15",
        postal_code: "65000",
        client_id: 3,
      },
      {
        country: "Poland",
        city: "Warsaw",
        street: "Krakowska 8",
        postal_code: "00-001",
        client_id: 5,
      },
      {
        country: "Germany",
        city: "Berlin",
        street: "Alexanderplatz 1",
        postal_code: "10178",
        client_id: 2,
      },
      {
        country: "Poland",
        city: "Krakow",
        street: "Krakowska 98",
        postal_code: "00-001",
        client_id: 2,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { category_name: "Electronics", description: "Devices and gadgets" },
      { category_name: "Clothing", description: "Men and women apparel" },
      { category_name: "Home", description: "Home and kitchen appliances" },
      { category_name: "Books", description: "Printed and digital books" },
      { category_name: "Sports", description: "Sports and outdoor equipment" },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        product_name: 'Смартфон "Galaxy S30"',
        price: 29999,
        quantity: 50,
        description: "Флагманський смартфон з покращеною камерою",
        stock_status: "in_stock",
        category_id: 1,
      },
      {
        product_name: 'Ноутбук "ThinkPad X2"',
        price: 45000,
        quantity: 25,
        description: "Потужний ноутбук для бізнесу",
        stock_status: "in_stock",
        category_id: 1,
      },
      {
        product_name: 'Бездротові навушники "AirSounds"',
        price: 4200,
        quantity: 150,
        description: "Навушники з активним шумозаглушенням",
        stock_status: "out_of_stock",
        category_id: 1,
      },
    ],
  });

  await prisma.worker.createMany({
    data: [
      {
        worker_role: "admin",
        first_name: "Dmytro",
        last_name: "Koval",
        phone_number: "+380501111111",
      },
      {
        worker_role: "manager",
        first_name: "Kateryna",
        last_name: "Hrytsenko",
        phone_number: "+380672222222",
      },
      {
        worker_role: "operator",
        first_name: "Oleh",
        last_name: "Melnyk",
        phone_number: "+380933333333",
      },
      {
        worker_role: "courier",
        first_name: "Serhii",
        last_name: "Tkachenko",
        phone_number: "+380504444444",
      },
      {
        worker_role: "courier",
        first_name: "Maria",
        last_name: "Lytvyn",
        phone_number: "+380505555555",
      },
    ],
  });

  await prisma.orders.createMany({
    data: [
      {
        order_date: new Date("2025-10-01"),
        order_price: 12400,
        status: "confirmed",
        discount: 5,
        client_id: 1,
        address_id: 1,
        worker_id: 3,
      },
      {
        order_date: new Date("2025-10-02"),
        order_price: 800,
        status: "processing",
        discount: 0,
        client_id: 3,
        address_id: 2,
        worker_id: 3,
      },
      {
        order_date: new Date("2025-10-03"),
        order_price: 1750,
        status: "shipped",
        discount: 10,
        client_id: 3,
        address_id: 3,
        worker_id: 3,
      },
      {
        order_date: new Date("2025-10-04"),
        order_price: 250,
        status: "delivered",
        discount: 0,
        client_id: 5,
        address_id: 4,
        worker_id: 3,
      },
      {
        order_date: new Date("2025-10-05"),
        order_price: 36000,
        status: "confirmed",
        discount: 15,
        client_id: 5,
        address_id: 5,
        worker_id: 3,
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        payment_method: "by_card",
        payment_status: "paid",
        price: 12400,
        order_id: 1,
      },
      {
        payment_method: "by_card",
        payment_status: "not_paid",
        price: 800,
        order_id: 2,
      },
      {
        payment_method: "by_card",
        payment_status: "paid",
        price: 1750,
        order_id: 3,
      },
      {
        payment_method: "by_card",
        payment_status: "paid",
        price: 250,
        order_id: 4,
      },
      {
        payment_method: "by_card",
        payment_status: "paid",
        price: 36000,
        order_id: 5,
      },
    ],
  });

  await prisma.shipment.createMany({
    data: [
      {
        carrier: "Нова Пошта",
        tracking_number: "20450123456789",
        shipment_status: "shipped",
        shipping_date: new Date("2025-10-13"),
        order_id: 1,
        worker_id: 3,
      },
      {
        carrier: "Укр Пошта",
        tracking_number: "20450123456788",
        shipment_status: "processing",
        shipping_date: new Date("2025-10-19"),
        order_id: 2,
        worker_id: 3,
      },
      {
        carrier: "Нова Пошта",
        tracking_number: "20450123456787",
        shipment_status: "confirmed",
        shipping_date: new Date("2025-10-16"),
        order_id: 3,
        worker_id: 3,
      },
      {
        carrier: "MEEST",
        tracking_number: "20450123456786",
        shipment_status: "shipped",
        shipping_date: new Date("2025-10-12"),
        order_id: 4,
        worker_id: 3,
      },
      {
        carrier: "Нова Пошта",
        tracking_number: "20450123456784",
        shipment_status: "shipped",
        shipping_date: new Date("2025-10-13"),
        order_id: 5,
      },
    ],
  });

  await prisma.order_item.createMany({
    data: [
      { quantity: 1, order_id: 5, product_id: 1 },
      { quantity: 2, order_id: 4, product_id: 2 },
      { quantity: 5, order_id: 3, product_id: 3 },
      { quantity: 4, order_id: 2, product_id: 2 },
      { quantity: 1, order_id: 1, product_id: 1 },
    ],
  });
  await prisma.review.createMany({
    data: [
      { rating: 5, comment: "Excellent product!", product_id: 1, client_id: 1 },
      {
        rating: 4,
        comment: "Very good, fast delivery",
        product_id: 1,
        client_id: 2,
      },
      { rating: 3, comment: "Average quality", product_id: 2, client_id: 1 },
      { rating: 5, comment: "Highly recommend!", product_id: 2, client_id: 3 },
      { rating: 2, comment: "Not satisfied", product_id: 3, client_id: 2 },
    ],
  });
  console.log("Table filled");
}

module.exports = { seed: main };
