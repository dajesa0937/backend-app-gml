const db = require("../../config/db");

const getAll = async () => {
  const query = `
    SELECT id, name, description, price, stock, category
    FROM products
    ORDER BY created_at DESC
  `;
  const { rows } = await db.query(query);
  return rows;
};

const create = async (product) => {
  const query = `
    INSERT INTO products (name, description, price, stock, category)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.category,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const update = async (id, product) => {
  const query = `
    UPDATE products
    SET name=$1, description=$2, price=$3, stock=$4, category=$5
    WHERE id=$6
    RETURNING *
  `;

  const values = [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.category,
    id,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const remove = async (id) => {
  await db.query("DELETE FROM products WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
