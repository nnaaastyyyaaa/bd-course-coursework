const express = require("express");
const { PrismaClient } = require("@prisma/client");

const userRoutes = require("./routes/userRoutes");
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});
app.use("/api/users", userRoutes);

module.exports = app;
