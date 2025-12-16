const paymentService = require("../services/paymentService");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.json(payments);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = paymentService.getPayment(id);
    res.json(payment);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPayment = await paymentService.updatePayment(id, req.body);
    res.json({ "Updated payment": updatedPayment });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    await paymentService.deletePayment(id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
