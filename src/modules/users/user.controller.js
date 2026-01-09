const userService = require("./user.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const result = await userService.loginUser(email, password);

    return res.status(200).json({
      message: "Login exitoso",
      ...result,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, name, lastName, phone, password } = req.body;

    if (!email || !name || !lastName || !password) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    const user = await userService.registerUser({
      email,
      name,
      lastName,
      phone,
      password,
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Error al registrar usuario",
    });
  }
};

module.exports = {
  register,
  login,
};
