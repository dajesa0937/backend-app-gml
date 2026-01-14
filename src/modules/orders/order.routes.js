const express = require("express");
const router = express.Router();
const controller = require("./orders.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const adminMiddleware = require("../../middlewares/admin.middleware");

// Cliente crea pedido
router.post("/", authMiddleware, controller.createOrder);

// Cliente ve sus pedidos
router.get("/my", authMiddleware, controller.getMyOrders);

// Admin ve todos los pedidos
router.get("/", authMiddleware, adminMiddleware, controller.getAllOrders);

// Admin cambia estado
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  controller.updateStatus
);

module.exports = router;
