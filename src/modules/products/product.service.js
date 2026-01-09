const productRepository = require("./product.repository");

const getAllProducts = async () => {
  return await productRepository.getAll();
};

const createProduct = async (data) => {
  return await productRepository.create(data);
};

const updateProduct = async (id, data) => {
  return await productRepository.update(id, data);
};

const deleteProduct = async (id) => {
  return await productRepository.remove(id);
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
