const MyError = require("../services/myError");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await req.prisma.payment.findMany();
    if (!payments) throw new MyError("Payments not found", 404);
    res.json(payments);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await req.prisma.payment.findUnique({
      where: { payment_id: Number(id) },
    });
    if (!payment) throw new MyError("Payment not found", 404);
    res.json(payment);
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    if ("order_id" in req.body)
      throw new MyError("You can`t update order_id", 400);
    const updatedPayment = await req.prisma.payment.update({
      where: { payment_id: Number(id) },
      data: req.body,
    });
    if (!updatedPayment) throw new MyError("Failed to update payment", 500);
    res.json({ "Updateed payment": updatedPayment });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    await req.prisma.payment.delete({
      where: { payment_id: Number(id) },
    });
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.status || 505).json({ error: error.message });
  }
};
