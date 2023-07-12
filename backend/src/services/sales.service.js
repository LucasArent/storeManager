const { salesModel } = require('../models');

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
  const addNewSale = await salesModel.createSale(cadasterSale);
  return { status: 'CREATED', data: addNewSale };
};

module.exports = { getAllProductSales, getbyIdProductSale, createProductSale };
