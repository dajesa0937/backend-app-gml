// src/middlewares/admin.middleware.js

const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso solo para administradores" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
};

module.exports = adminMiddleware;
