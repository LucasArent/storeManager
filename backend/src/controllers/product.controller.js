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

const createProduct = async (req, res) => {
  const productAdd = req.body;
  if (!productAdd.name) {
    return res.status(400).json({
      message: '"name" is required',
    }); // { message: 'Product is required' } test pra quebrar
  }
  console.log('ProductAdd', typeof productAdd);
  const { status, data } = await productService.postNewProduct(productAdd);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allProducts,
  productById,
  createProduct,
};
