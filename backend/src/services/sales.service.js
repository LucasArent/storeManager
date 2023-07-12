const { salesModel, productModel } = require('../models');
const { saleSchemaProducts } = require('./validations/schemas');

const getAllProductSales = async () => {
  const sales = await salesModel.allFindSales();
  // if (sales.length < 1) {
  //   return { status: 'NOT_FOUND', data: { message: 'There are no sales' } };
  // }
  return { status: 'SUCCESSFUL', data: sales };
};

const getbyIdProductSale = async (saleID) => {
  const sale = await salesModel.byIdFindSale(saleID);
  if (sale.length < 1) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

const createProductSale = async (cadasterSale) => {
  const { error } = saleSchemaProducts.validate(cadasterSale);
  if (error) {
    return {
      status: 'INVALID_VALUE',
      data: { message: '"quantity" must be greater than or equal to 1' }, 
    };
  }

  const productsValidation = cadasterSale.map(({ productId }) => 
    productModel.findIdProducts(productId));
    const value = await Promise.all(productsValidation);
    if (value.includes(undefined)) {
      return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' } };
    }
  const addNewSale = await salesModel.createSale(cadasterSale);
  return { status: 'CREATED', data: addNewSale };
};

module.exports = { getAllProductSales, getbyIdProductSale, createProductSale };
