const db = require("../../config/db");

/**
 * Busca un usuario por email
 * @param {string} email
 * @returns {object|null}
 */
const findByEmail = async (email) => {
  const query = `
    SELECT id, email, name, last_name, phone, password, role
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const { rows } = await db.query(query, [email]);
  return rows.length ? rows[0] : null;
};

/**
 * Crea un nuevo usuario
 * @param {object} user
 * @returns {object}
 */
const createUser = async (user) => {
  const query = `
    INSERT INTO users (email, name, last_name, phone, password, role)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, name, last_name, phone, role, created_at
  `;

  const values = [
    user.email,
    user.name,
    user.lastName,
    user.phone,
    user.password,
    user.role || "cliente", // 👈 por defecto cliente
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

module.exports = {
  findByEmail,
  createUser,
};
