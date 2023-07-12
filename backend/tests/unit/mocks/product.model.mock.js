const allProductsDB = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const allProductsModel = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productByIDModel = {
  id: 99,
  name: 'Escudo do Capitão América',
};

const productByIDDB = {
  id: 99,
  name: 'Escudo do Capitão América',
};

const productIdFromDB = { insertId: 99 };
const productIdFromModel = 99;

const allproductsFromServiceSuccess = {
  status: 'SUCCESSFUL',
  data: allProductsModel,
};

const productByIdFromServiceSuccess = {
  status: 'SUCCESSFUL',
  data: productByIDModel,
};

const productByIdFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

module.exports = {
  allProductsDB,
  allProductsModel,
  productByIDModel,
  productByIDDB,
  productIdFromDB,
  productIdFromModel,
  allproductsFromServiceSuccess,
  productByIdFromServiceSuccess,
  productByIdFromServiceNotFound,
};
