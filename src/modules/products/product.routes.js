const express = require("express");
const router = express.Router();

const productController = require("./product.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

// 📦 GET productos (autenticado)
router.get("/", authMiddleware, productController.getAllProducts);

// ➕ CREATE producto (admin)
router.post("/", authMiddleware, productController.createProduct);

// ✏️ UPDATE producto (admin)
router.put("/:id", authMiddleware, productController.updateProduct);

// ❌ DELETE producto (admin)
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
