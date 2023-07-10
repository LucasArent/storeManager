const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findProducts();
  if (products.length < 1) {
    return {
      status: 'NOT_FOUND',
      data: {
        message: 'There are no products',
      },
    };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productModel.findIdProducts(id);
  if (!product) {
    return {
      status: 'NOT_FOUND',
      data: {
        message: 'Product not found',
      },
    };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = { findAll, findById };
