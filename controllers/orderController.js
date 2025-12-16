const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req, req.body);
    res.status(201).json({ "Created order": order });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderService.getOrder(id);
    res.json(order);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(id, status);
    res.json({ "Updated order": updatedOrder });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await orderService.deleteOrder(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.addOrderItem = async (req, res) => {
  try {
    const newOrder = await orderService.addOrderItem(req.body);
    res.json({ "Added order item and updated order": newOrder });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
