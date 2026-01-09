const bcrypt = require("bcryptjs");
const userRepository = require("./user.repository");
const jwt = require("jsonwebtoken");

const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role, // ✅ ROL EN JWT
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      role: user.role, // ✅ ROL AL FRONTEND
    },
  };
};

const registerUser = async (userData) => {
  const { email, password } = userData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

module.exports = {
  registerUser,
  loginUser,
};
