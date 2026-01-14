const pool = require("../../config/db");

exports.createOrder = async (userId, items) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let total = 0;

    // 1. Obtener precios reales
    for (const item of items) {
      const { rows } = await client.query(
        "SELECT price FROM products WHERE id = $1",
        [item.productId]
      );

      if (rows.length === 0) {
        throw new Error("Producto no encontrado");
      }

      total += rows[0].price * item.quantity;
    }

    // 2. Crear orden
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total)
       VALUES ($1, $2)
       RETURNING id`,
      [userId, total]
    );

    const orderId = orderResult.rows[0].id;

    // 3. Insertar items
    for (const item of items) {
      const { rows } = await client.query(
        "SELECT price FROM products WHERE id = $1",
        [item.productId]
      );

      await client.query(
        `INSERT INTO order_items (order_id, product_id, price, quantity)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, rows[0].price, item.quantity]
      );
    }

    await client.query("COMMIT");
    return { id: orderId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
