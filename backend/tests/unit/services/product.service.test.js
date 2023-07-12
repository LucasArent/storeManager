const { expect } = require('chai');
const sinon = require('sinon');
// const joi = require('joi');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { 
  allProductsDB, 
  allProductsModel, 
  productByIDDB, 
  productByIDModel,
  productIdFromDB,
} = require('../mocks/product.model.mock');

describe('teste dos service', function () {
it('acha todos os produtos com sucesso', async function () {
  sinon.stub(productModel, 'findProducts').resolves(allProductsDB);

  const serviceResponse = await productService.findAll();

  expect(serviceResponse.status).to.equal('SUCCESSFUL');
  expect(serviceResponse.data).to.deep.members(allProductsModel); // to.deep.equal
});

  it('retorna SUCCESSFUL quando acha o produto pelo id', async function () {
    sinon.stub(productModel, 'findIdProducts').resolves(productByIDDB);

    const inputData = 2;
    const serviceResponse = await productService.findById(inputData);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(productByIDModel);
  });

  it('retorna NOT_FOUND quando não acha todos os produtos', async function () {
    sinon.stub(productModel, 'findProducts').resolves([]);
  
    const serviceResponse = await productService.findAll();
  
    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'There are no products' });
  });

  it('retorna NOT_FOUND quando não acha o produto por id', async function () {
    sinon.stub(productModel, 'findIdProducts').resolves(undefined);

    const inputData = 9;
    const serviceResponse = await productService.findById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('testa o minimo do nome do produto', async function () { // test joi
    const inputData = {
      name: 'sla',
    };
    const serviceResponse = await productService.postNewProduct(inputData);

    expect(serviceResponse.status).to.equal('INVALID_VALUE');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

    it('retorna SUCCESSFUL quando cria um novo produto', async function () {
    sinon.stub(productModel, 'insertNewProduct').resolves(productIdFromDB);
    sinon.stub(productModel, 'findIdProducts').resolves(productByIDDB);

    const inputData = {
      name: 'produto sla',
    };
    console.log('inputData', typeof inputData);
    const serviceResponse = await productService.postNewProduct(inputData);

    expect(serviceResponse.status).to.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(productByIDModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});
