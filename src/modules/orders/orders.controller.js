const pool = require("../../config/db");

/**
 * Cliente crea pedido
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Pedido vacío" });
    }

    let total = 0;

    // Crear orden
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total)
       VALUES ($1, 0)
       RETURNING id`,
      [userId]
    );

    const orderId = orderResult.rows[0].id;

    // Insertar items
    for (const item of items) {
      const productResult = await pool.query(
        "SELECT price FROM products WHERE id = $1",
        [item.productId]
      );

      if (productResult.rows.length === 0) continue;

      const price = productResult.rows[0].price;
      const subtotal = price * item.quantity;
      total += subtotal;

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, price, quantity)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, price, item.quantity]
      );
    }

    // Actualizar total
    await pool.query("UPDATE orders SET total = $1 WHERE id = $2", [
      total,
      orderId,
    ]);

    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando pedido" });
  }
};

/**
 * Cliente ve sus pedidos
 */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo pedidos" });
  }
};

/**
 * Admin ve todos los pedidos
 */
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo pedidos" });
  }
};

/**
 * Admin cambia estado
 */
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
      status,
      id,
    ]);

    res.json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando estado" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
};
