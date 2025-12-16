const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");
const crypto = require("crypto");

const updateProduct = async (transaction, product_id, quantity) => {
  const result = await repository.updateMany(
    "product",
    {
      product_id: Number(product_id),
      quantity: { gte: quantity },
    },
    {
      quantity: { decrement: quantity },
    },
    transaction
  );

  if (result.count === 0) {
    throw new MyError("Haven't enough products in stock", 400);
  }

  const updatedProduct = await repository.getOne(
    "product",
    { product_id: Number(product_id) },
    transaction
  );

  if (!updatedProduct)
    throw new MyError(`Couldn't find product with id ${product_id}`, 404);

  const finalyUpdatedProduct = await repository.update(
    "product",
    { product_id: Number(product_id) },
    {
      stock_status: updatedProduct.quantity > 0 ? "in_stock" : "out_of_stock",
    },
    transaction
  );

  return finalyUpdatedProduct;
};

exports.createOrder = async (req, body) => {
  const { client_id, address, worker_id, items, carrier, payment_method } =
    req.body;

  let newAddress, newOrder, newPayment, newShipment;
  let orderItems = [];
  if (!client_id || !address || !worker_id || !carrier || !payment_method)
    throw new MyError("Enter all order details!", 400);

  const { country, city, street, postal_code } = address;

  if (!country || !city || !street || !postal_code)
    throw new MyError("Enter full address details", 400);

  if (!items || items.length === 0)
    throw new MyError("Order must contain at least one item!", 400);

  await req.prisma.$transaction(async (transaction) => {
    newAddress = await repository.create(
      "address",
      {
        country,
        city,
        street,
        postal_code,
        client_id,
      },
      transaction
    );
    if (!newAddress) throw new MyError("Error while creating address", 500);

    const productIds = items.map((i) => i.product_id);
    const products = await repository.getAll(
      "product",
      { where: { product_id: { in: productIds } } },
      transaction
    );
    if (!products) throw new MyError("Products not found", 404);

    const priceAndId = Object.fromEntries(
      products.map((p) => [p.product_id, p.price])
    );

    let order_price = 0;
    for (const item of items) {
      const { quantity, product_id } = item;
      if (!priceAndId[product_id])
        throw new MyError(`Product with id ${product_id} not found`, 404);

      const updatedProduct = await updateProduct(
        transaction,
        product_id,
        quantity
      );

      if (!updatedProduct)
        throw new MyError("Error while updating product stock", 500);

      order_price += priceAndId[product_id] * quantity;
    }

    newOrder = await repository.create(
      "orders",
      {
        order_price,
        client_id,
        address_id: newAddress.address_id,
        worker_id,
      },
      transaction
    );

    if (!newOrder) throw new MyError("Error while creating order", 500);
    orderItems = await Promise.all(
      items.map((item) =>
        repository.create(
          "order_item",
          {
            quantity: item.quantity,
            order_id: newOrder.order_id,
            product_id: item.product_id,
          },
          transaction
        )
      )
    );

    newShipment = await repository.create(
      "shipment",
      {
        carrier,
        tracking_number: "TRK-" + crypto.randomUUID().slice(0, 6).toUpperCase(),
        order_id: newOrder.order_id,
        worker_id: 4,
      },
      transaction
    );
    if (!newShipment) throw new MyError("Error while creating shipment", 500);

    newPayment = await repository.create(
      "payment",
      {
        payment_method,
        price: order_price,
        order_id: newOrder.order_id,
      },
      transaction
    );
    if (!newPayment) throw new MyError("Error while creating payment", 500);
  });
  return {
    order: newOrder,
    address: newAddress,
    payment: newPayment,
    shipment: newShipment,
    orderItems,
  };
};

exports.getAllOrders = async () => {
  const orders = await repository.getAll("orders");
  if (!orders) throw new MyError("Orders not found", 404);
  return orders;
};

exports.getOrder = async (id) => {
  const order = await repository.getOne("orders", { order_id: Number(id) });
  if (!order) throw new MyError("Order not found", 404);
  return order;
};

exports.updateOrderStatus = async (id, status) => {
  const updatedOrder = await repository.update(
    "orders",
    { order_id: Number(id) },
    { status }
  );
  if (!updatedOrder) throw new MyError("Failed to update order", 500);
  return updatedOrder;
};

exports.deleteOrder = async (id) => {
  await repository.delete("orders", { order_id: Number(id) });
};

exports.addOrderItem = async (body) => {
  const { quantity, order_id, product_id } = body;

  if (!quantity || !order_id || !product_id)
    throw new MyError("Enter all required fields!", 400);

  let orderItem, newOrder;

  await req.prisma.$transaction(async (transaction) => {
    const product = await repository.getOne(
      "product",
      { product_id: Number(product_id) },
      transaction
    );
    if (!product) throw new MyError("Invalid product_id", 400);

    const updatedProduct = await updateProduct(
      transaction,
      product_id,
      quantity
    );

    if (!updatedProduct)
      throw new MyError("Error while updating product stock", 500);

    const order = await repository.getOne(
      "orders",
      { order_id: Number(order_id) },
      transaction
    );
    if (!order) throw new MyError("Invalid order_id", 400);

    orderItem = await repository.create(
      "order_item",
      { quantity, order_id, product_id },
      transaction
    );
    if (!orderItem) throw new MyError("Failed to create order item", 500);

    const OIprice = quantity * product.price;

    newOrder = await repository.update(
      "orders",
      { order_id: Number(order_id) },
      { order_price: order.order_price + OIprice },
      transaction
    );
    if (!newOrder) throw new MyError("Failed to update order", 500);

    const newPayment = await repository.update(
      "payment",
      { order_id: newOrder.order_id },
      {
        date: Date.now(),
        price: newOrder.order_price,
      },
      transaction
    );

    if (!newPayment) throw new MyError("Failed to update payment", 500);

    return { orderItem, newOrder };
  });
};
