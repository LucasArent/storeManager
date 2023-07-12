const { productModel } = require('../models');
const { schemaProduct } = require('./validations/schemas'); // import pra 6

const findAll = async () => {
  const products = await productModel.findProducts();

  return {
    status: products.length > 0 ? 'SUCCESSFUL' : 'NOT_FOUND',
    data:
     products.length > 0 ? products : { message: 'There are no products'}, 
    };
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
  const { error } = schemaProduct.validate(product);
  if (error) {
    return { status: 'INVALID_VALUE', 
    data: {
      message: error.message,
    } };
  }

  // if (product.name.length < 5) {
  //   return {
  //     status: 'INVALID_VALUE',
  //     data: { 
  //       message: '"name" length must be at least 5 characters long', 
  //     },
  //   };
  // }

  const insertProducts = await productModel.insertNewProduct(product);
  const insertProductId = await productModel.findIdProducts(insertProducts);

  return { status: 'CREATED', data: insertProductId };
};

const updateProductDesc = async (id, productUpdate) => {
  const { error } = schemaProduct.validate(productUpdate);
  if (error) return { status: 'INVALID_VALUE', data: { message: error.message } };

  const validadeProduct = await productModel.findIdProducts(id);
  if (!validadeProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productModel.productUpdate(id, productUpdate);
  const productUpdated = await productModel.findIdProducts(id);
  return { status: 'SUCCESSFUL', data: productUpdated };
};

module.exports = { 
  findAll, 
  findById, 
  postNewProduct,
  updateProductDesc,
};
