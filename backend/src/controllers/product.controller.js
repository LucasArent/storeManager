const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allProducts = async (_req, res) => {
  const { status, data } = await productService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};
  // tirei os if 
const createProduct = async (req, res) => {
  const productAdd = req.body;
  const { status, data } = await productService.postNewProduct(productAdd);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allProducts,
  productById,
  createProduct,
};
