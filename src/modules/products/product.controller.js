const service = require("./product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await service.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.updateProduct(id, req.body);
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
