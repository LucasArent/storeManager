const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { 
    saleAllProducstDB, 
    saleAllProductsModel, 
    saleProductIdFromDB, 
    saleProductIdFromModel,
    saleProductsIdFromDB,
    saleProductsIdFromModel,
} = require('../mocks/sale.product.mock');

describe('testa o model de vendas', function () {
    it('testa se conhece ver todas as vendas', async function () {
        sinon.stub(connection, 'execute').resolves([saleAllProducstDB]);

        const sales = await salesModel.allFindSales();

        expect(sales).to.be.an('array');
        expect(sales).to.have.deep.equal(saleAllProductsModel);
    });

    it('testa se consegue encontrar uma venda pelo seu id', async function () {
        sinon.stub(connection, 'execute').resolves([[saleProductIdFromDB]]);

        const inputData = 99;
        const sale = await salesModel.byIdFindSale(inputData);

        expect(sale).to.be.an('array');
        expect(sale).to.have.deep.equal(saleProductIdFromModel);
    });

    // it('testa se registra uma nova venda', async function () {
    //     sinon.stub(connection, 'execute')
    //     .onFirstCall()
    //     .resolves([saleProductsIdFromDB])
    //     .onSecondCall()
    //     .resolves(null);

    //     const inputData = [
    //         { productId: 1, quantity: 1 },
    //         { productId: 2, quantity: 5 },
    //     ];
    //     const registeredSale = await salesModel.registeredSale(inputData);

    //     expect(registeredSale).to.be.an('object');
    //     expect(registeredSale).to.be.deep.equal(saleProductsIdFromModel);
    // });
    
    afterEach(function () {
        sinon.restore();
    });
});