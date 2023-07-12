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

const postNewProduct = async (product) => {
  if (product.name.length < 5) {
    return {
      status: 'INVALID_VALUE',
      data: { 
        message: '"name" length must be at least 5 characters long', 
      },
    };
  }
  const insertProducts = await productModel.insertNewProduct(product);
  const insertProductId = await productModel.findIdProducts(insertProducts);

  return { status: 'CREATED', data: insertProductId };
};

module.exports = { 
  findAll, 
  findById, 
  postNewProduct,
};
