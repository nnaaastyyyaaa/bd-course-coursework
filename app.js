const express = require("express");
const { PrismaClient } = require("@prisma/client");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);

module.exports = app;
