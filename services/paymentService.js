const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllPayments = async () => {
  const payments = await repository.getAll("payment");
  if (!payments) throw new MyError("Payments not found", 404);
  return payments;
};

exports.getPayment = async (id) => {
  const payment = await repository.getOne("payment", {
    payment_id: Number(id),
  });
  if (!payment) throw new MyError("Payment not found", 404);
  return payment;
};

exports.updatePayment = async (id, body) => {
  if ("order_id" in body) throw new MyError("You can`t update order_id", 400);
  const updatedPayment = await repository.update(
    "payment",
    { payment_id: Number(id) },
    body
  );
  if (!updatedPayment) throw new MyError("Failed to update payment", 500);
  return updatedPayment;
};

exports.deletePayment = async (id) => {
  await repository.delete("payment", { payment_id: Number(id) });
};
