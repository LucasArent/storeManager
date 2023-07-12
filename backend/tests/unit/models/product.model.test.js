const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { 
  allProductsDB, 
  allProductsModel, 
  productByIDDB, 
  productByIDModel, 
  productIdFromDB,
  productIdFromModel,
} = require('../mocks/product.model.mock');

describe('testes do model', function () {
  it('testa se consegue encontrar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsDB]);

    const products = await productModel.findProducts();

    expect(products).to.be.an('array');
    expect(products).to.have.deep.members(allProductsModel);
  });

  it('testa se consegue encontrar os produtos pelo seus ids', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIDDB]]);
  
    const inputData = 99;
    const product = await productModel.findIdProducts(inputData);
  
    expect(product).to.be.an('object');
    expect(product).to.deep.equal(productByIDModel);
  });

  it('testa se consegue criar um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = { 
      name: 'Produto X',
   };
    const insertId = await productModel.insertNewProduct(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(productIdFromModel);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
