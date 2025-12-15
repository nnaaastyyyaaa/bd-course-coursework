const MyError = require("../services/myError");

const updateProduct = async (transaction, product_id, quantity) => {
  const result = await transaction.product.updateMany({
    where: {
      product_id: Number(product_id),
      quantity: { gte: quantity },
    },
    data: {
      quantity: { decrement: quantity },
    },
  });

  if (result.count === 0) {
    throw new MyError("Haven't enough products in stock", 400);
  }

  const updatedProduct = await transaction.product.findUnique({
    where: { product_id: Number(product_id) },
  });

  if (!updatedProduct)
    throw new MyError(`Couldn't find product with id ${product_id}`, 404);

  const finalyUpdatedProduct = await transaction.product.update({
    where: { product_id: Number(product_id) },
    data: {
      stock_status: updatedProduct.quantity > 0 ? "in_stock" : "out_of_stock",
    },
  });

  return finalyUpdatedProduct;
};

exports.createOrder = async (req, res) => {
  const { client_id, address, worker_id, items, carrier, payment_method } =
    req.body;

  let newAddress, newOrder, newPayment, newShipment;
  let orderItems = [];
  try {
    if (!client_id || !address || !worker_id || !carrier || !payment_method)
      throw new MyError("Enter all order details!", 400);

    const { country, city, street, postal_code } = address;

    if (!country || !city || !street || !postal_code)
      throw new MyError("Enter full address details", 400);

    if (!items || items.length === 0)
      throw new MyError("Order must contain at least one item!", 400);

    await req.prisma.$transaction(async (transaction) => {
      newAddress = await transaction.address.create({
        data: {
          country,
          city,
          street,
          postal_code,
          client_id,
        },
      });
      if (!newAddress) throw new MyError("Error while creating address", 500);

      const productIds = items.map((i) => i.product_id);
      const products = await transaction.product.findMany({
        where: { product_id: { in: productIds } },
      });
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

      newOrder = await transaction.orders.create({
        data: {
          order_price,
          client_id,
          address_id: newAddress.address_id,
          worker_id,
        },
      });

      if (!newOrder) throw new MyError("Error while creating order", 500);
      orderItems = await Promise.all(
        items.map((item) =>
          transaction.order_item.create({
            data: {
              quantity: item.quantity,
              order_id: newOrder.order_id,
              product_id: item.product_id,
            },
          })
        )
      );

      newShipment = await transaction.shipment.create({
        data: {
          carrier,
          tracking_number:
            "TRK-" + crypto.randomUUID().slice(0, 6).toUpperCase(),
          order_id: newOrder.order_id,
          worker_id: 4,
        },
      });
      if (!newShipment) throw new MyError("Error while creating shipment", 500);

      newPayment = await transaction.payment.create({
        data: {
          payment_method,
          price: order_price,
          order_id: newOrder.order_id,
        },
      });
      if (!newPayment) throw new MyError("Error while creating payment", 500);
    });
    res.status(201).json({
      "Created order": {
        order: newOrder,
        items: orderItems,
        address: newAddress,
        shipment: newShipment,
        payment: newPayment,
      },
    });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await req.prisma.orders.findMany();
    if (!orders) throw new MyError("Orders not found", 404);
    res.json(orders);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await req.prisma.orders.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) throw new MyError("Order not found", 404);
    res.json(order);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedOrder = await req.prisma.orders.update({
      where: { order_id: Number(id) },
      data: { status },
    });
    if (!updatedOrder) throw new MyError("Failed to update order", 500);
    res.json({ "Updated order": updatedOrder });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.orders.delete({
      where: { order_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.addOrderItem = async (req, res) => {
  try {
    const { quantity, order_id, product_id } = req.body;
    if (!quantity || !order_id || !product_id)
      throw new MyError("Enter all required fields!", 400);
    let orderItem, newOrder;
    await req.prisma.$transaction(async (transaction) => {
      const product = await transaction.product.findUnique({
        where: { product_id: Number(product_id) },
      });
      if (!product) throw new MyError("Invalid product_id", 400);

      const updatedProduct = await updateProduct(
        transaction,
        product_id,
        quantity
      );

      if (!updatedProduct)
        throw new MyError("Error while updating product stock", 500);

      const order = await transaction.orders.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order) throw new MyError("Invalid order_id", 400);

      orderItem = await transaction.order_item.create({
        data: { quantity, order_id, product_id },
      });
      if (!orderItem) throw new MyError("Failed to create order item", 500);

      const OIprice = quantity * product.price;

      newOrder = await transaction.orders.update({
        where: { order_id: Number(order_id) },
        data: { order_price: order.order_price + OIprice },
      });
      if (!newOrder) throw new MyError("Failed to update order", 500);

      const newPayment = await transaction.payment.update({
        where: { order_id: newOrder.order_id },
        data: {
          date: Date.now(),
          payment: newOrder.order_price,
        },
      });

      if (!newPayment) throw new MyError("Failed to update payment", 500);
    });
    res.json({ "Added order item and updated order": orderItem, newOrder });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
