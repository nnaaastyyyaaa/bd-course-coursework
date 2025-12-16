const MyError = require("./myError");
const repository = require("../repositories/analyticsRepository");

exports.getCitiesAvgSumPerClientOver = async (number) => {
  const result = await repository.citiesAvgSumPerClientOver(number);
  if (!result) throw new MyError("No analytics found", 404);
  return result;
};

exports.getClientAvgPriceGreater = async () => {
  const result = await repository.clientAvgPriceGreater();
  if (!result) throw new MyError("No analytics found", 404);
  return result;
};

exports.getClientTotalSpentOver = async (number) => {
  const result = await repository.clientTotalSpentOver(number);
  if (!result) throw new MyError("No analytics found", 404);
  return result;
};
