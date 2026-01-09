const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/products", require("./modules/products/product.routes"));
app.use("/api/users", require("./modules/users/user.routes"));

module.exports = app;
