exports.getAllPayments = async (req, res) => {
  try {
    const payments = await req.prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await req.prisma.payment.findUnique({
      where: { payment_id: Number(id) },
    });
    if (!payment) throw new Error("Payment not found");
    res.json(payment);
  } catch (error) {
    res.status(505).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    if ("order_id" in req.body) throw new Error("You can`t update order_id");
    const updatedPayment = await req.prisma.payment.update({
      where: { payment_id: Number(id) },
      data: req.body,
    });
    if (!updatedPayment) throw new Error("Failed to update payment");
    res.json({ "Updateed payment": updatedPayment });
  } catch (error) {
    res.status(505).json({ error: error.message });
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
    res.status(505).json({ error: error.message });
  }
};
