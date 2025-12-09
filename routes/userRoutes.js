const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await req.prisma.client.findMany();
  res.json(users);
});

module.exports = router;
