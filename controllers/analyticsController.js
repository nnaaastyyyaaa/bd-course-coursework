const analyticsService = require("../services/analyticsService");

exports.getCitiesAvgSumPerClientOver = async (req, res) => {
  try {
    const number = Number(req.params.number);
    const cities = await analyticsService.getCitiesAvgSumPerClientOver(number);
    res.json(cities);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getClientAvgPriceGreater = async (req, res) => {
  try {
    const clients = await analyticsService.getClientAvgPriceGreater();
    res.json(clients);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getClientTotalSpentOver = async (req, res) => {
  try {
    const number = Number(req.params.number);
    const clients = await analyticsService.getClientTotalSpentOver(number);
    res.json(clients);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};
