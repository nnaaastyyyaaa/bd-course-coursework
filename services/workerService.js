const MyError = require("../services/myError");
const repository = require("../repositories/baseRepository");

exports.getAllWorkers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [workers, total] = await Promise.all([
    repository.getAll("worker", {
      skip: skip,
      take: limit,
    }),
    repository.count("worker"),
  ]);
  if (!workers) throw new MyError("Workers not found", 404);
  return {
    data: workers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.createWorker = async (body) => {
  const { worker_role, first_name, last_name, phone_number } = body;
  if (!worker_role || !first_name || !last_name || !phone_number)
    throw new Error("Enter all required fields!", 400);

  const worker = await repository.create("worker", {
    worker_role,
    first_name,
    last_name,
    phone_number,
  });
  if (!worker) throw new MyError("Failed to create worker", 500);
  return worker;
};

exports.getWorker = async (id) => {
  const worker = await repository.getOne("worker", {
    worker_id: Number(id),
  });
  if (!worker) throw new MyError("worker not found", 404);
  return worker;
};

exports.updateWorker = async (id, body) => {
  const updatedWorker = await repository.update(
    "worker",
    { worker_id: Number(id) },
    body
  );
  if (!updatedWorker) throw new MyError("Failed to update worker", 500);
  return updatedWorker;
};

exports.deleteWorker = async (id) => {
  await repository.delete("worker", {
    worker_id: Number(id),
  });
};
