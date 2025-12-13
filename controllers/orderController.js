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
    throw new Error("Haven't enough products in stock");
  }

  const updatedProduct = await transaction.product.findUnique({
    where: { product_id: Number(product_id) },
  });

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
    const { country, city, street, postal_code } = address;
    if (!country || !city || !street || !postal_code)
      throw new Error("Enter full address details");
    if (!items || items.length === 0)
      throw new Error("Order must contain at least one item!");

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
      if (!newAddress) throw new Error("Error while creating address");

      const productIds = items.map((i) => i.product_id);
      const products = await transaction.product.findMany({
        where: { product_id: { in: productIds } },
      });

      const priceAndId = Object.fromEntries(
        products.map((p) => [p.product_id, p.price])
      );

      let order_price = 0;
      for (const item of items) {
        const { quantity, product_id } = item;
        if (!priceAndId[product_id])
          throw new Error(`Product with id ${product_id} not found`);

        const updatedProduct = await updateProduct(
          transaction,
          product_id,
          quantity
        );

        if (!updatedProduct)
          throw new Error("Error while updating product stock");

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

      if (!newOrder) throw new Error("Error while creating order");
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
      if (!newShipment) throw new Error("Error while creating shipment");

      newPayment = await transaction.payment.create({
        data: {
          payment_method,
          price: order_price,
          order_id: newOrder.order_id,
        },
      });
    });
    res.json({
      "Created order": {
        order: newOrder,
        items: orderItems,
        address: newAddress,
        shipment: newShipment,
        payment: newPayment,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await req.prisma.orders.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await req.prisma.orders.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) throw new Error("Order not found");
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    if (!updatedOrder) throw new Error("Failed to update order");
    res.json({ "Updateed order": updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

exports.addOrderItem = async (req, res) => {
  try {
    const { quantity, order_id, product_id } = req.body;
    let orderItem, newOrder;
    await req.prisma.$transaction(async (transaction) => {
      const product = await transaction.product.findUnique({
        where: { product_id: Number(product_id) },
      });
      if (!product) throw new Error("Invalid product_id");

      const updatedProduct = await updateProduct(
        transaction,
        product_id,
        quantity
      );

      if (!updatedProduct)
        throw new Error("Error while updating product stock");

      const order = await transaction.orders.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order) throw new Error("Invalid order_id");

      orderItem = await transaction.order_item.create({
        data: { quantity, order_id, product_id },
      });
      if (!orderItem) throw new Error("Failed to create order_item");

      const OIprice = quantity * product.price;

      newOrder = await transaction.orders.update({
        where: { order_id: Number(order_id) },
        data: { order_price: order.order_price + OIprice },
      });
      if (!newOrder) throw new Error("Failed to update order");

      const newPayment = await transaction.payment.update({
        where: { order_id: newOrder.order_id },
        data: {
          date: Date.now(),
          payment: newOrder.order_price,
        },
      });

      if (!newPayment) throw new Error("Failed to update payment");
    });
    res.json({ "Added order_item and updated order": orderItem, newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
