const date = '2023-07-05T22:12:44.000Z';

const saleAllProducstDB = [
  { date, saleId: 1, productId: 1, quantity: 5 },
  { date, saleId: 1, productId: 2, quantity: 10 },
  { date, saleId: 2, productId: 3, quantity: 15 },
];

const saleAllProductsModel = [
  { date, saleId: 1, productId: 1, quantity: 5 },
  { date, saleId: 1, productId: 2, quantity: 10 },
  { date, saleId: 2, productId: 3, quantity: 15 },
];

const saleProductIdFromDB =
  { date, productId: 3, quantity: 15 }
;

const saleProductIdFromModel = [
  { date, productId: 3, quantity: 15 },
];

module.exports = {
  saleAllProducstDB,
  saleAllProductsModel,
  saleProductIdFromDB,
  saleProductIdFromModel,
};
