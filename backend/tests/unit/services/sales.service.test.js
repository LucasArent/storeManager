const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
    saleAllProducstDB,
    saleAllProductsModel,
    saleProductIdFromDB,
    // saleProductIdFromModel,
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
    afterEach(function () {
        sinon.restore();
    });
});
