const prisma = require("../prisma/client");

exports.create = async (model, data, tx) =>
  await (tx || prisma)[model].create({
    data,
  });

exports.getAll = async (model, data, tx) =>
  await (tx || prisma)[model].findMany({
    where: data?.where,
  });
exports.getOne = async (model, data, tx) =>
  await (tx || prisma)[model].findUnique({
    where: data,
  });

exports.update = async (model, cond, data, tx) =>
  await (tx || prisma)[model].update({
    where: cond,
    data: data,
  });

exports.updateMany = async (model, cond, data, tx) =>
  await (tx || prisma)[model].updateMany({
    where: cond,
    data: data,
  });

exports.delete = async (model, data, tx) =>
  (tx || prisma)[model].delete({
    where: data,
  });
