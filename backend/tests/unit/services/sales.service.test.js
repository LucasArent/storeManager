const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
    saleAllProducstDB,
    saleAllProductsModel,
    saleProductIdFromDB,
    saleProductsIdFromModel,
} = require('../mocks/sale.product.mock');
const salesService = require('../../../src/services/sales.service');

describe('teste sale dos service', function () { 
    it('testa todas as vendas', async function () {
        sinon.stub(salesModel, 'allFindSales').resolves(saleAllProducstDB);

        const serviceResponse = await salesService.getAllProductSales();

        expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
        expect(serviceResponse.data).to.be.deep.equal(saleAllProductsModel);
    });
    it('testa uma venda pelo id', async function () {
        sinon.stub(salesModel, 'byIdFindSale').resolves(saleProductIdFromDB);

        const inputData = 99;
        const serviceResponse = await salesService.getbyIdProductSale(inputData);

        expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
        expect(serviceResponse.data).to.be.deep.equal(saleProductIdFromDB);
        });

    it('testa se registra uma nova venda', async function () {
        sinon.stub(salesModel, 'createSale').resolves(saleProductsIdFromModel);

        const inputData = [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 5 },
        ];
        const serviceResponse = await salesService.createProductSale(inputData);

        expect(serviceResponse.status).to.be.equal('CREATED');
        expect(serviceResponse.data).to.be.deep.equal(saleProductsIdFromModel);
    });

    it('testa se retorna erro ao registrar uma nova venda', async function () {
        const inputData = [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 0 },
        ];
        const serviceResponse = await salesService.createProductSale(inputData);

        expect(serviceResponse.status).to.be.equal('INVALID_VALUE');
        expect(serviceResponse.data).to.be.deep.equal({ 
            message: '"quantity" must be greater than or equal to 1', 
        });
    });
    it('testa se retorna NOT_FOUND quando não acha o id', async function () {
        const inputData = [
            { productId: 39, quantity: 1 },
            { productId: 2, quantity: 5 },
        ];
        const serviceResponse = await salesService.createProductSale(inputData);

        expect(serviceResponse.status).to.be.equal('NOT_FOUND');
        expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
    });
    afterEach(function () {
        sinon.restore();
    });
});
