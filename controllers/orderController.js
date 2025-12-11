exports.createOrder = async (req, res) => {
  const { client_id, address, worker_id, items } = req.body;
  const { country, city, street, postal_code } = address;
  let newAddress,
    newOrder,
    orderItems = [];
  try {
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
        order_price += quantity * priceAndId[product_id];
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
    });
    res.json({
      "Created order": {
        order: newOrder,
        items: orderItems,
        address: newAddress,
      },
    });
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};
