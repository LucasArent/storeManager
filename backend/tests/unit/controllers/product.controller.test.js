const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const {   
    allProductsModel,
    allproductsFromServiceSuccess,
} = require('../mocks/product.model.mock');

const { productController } = require('../../../src/controllers');

describe('testes do Controller', function () {
    it('consegue recuperar todos os produtos', async function () {
        sinon.stub(productService, 'findAll').resolves(allproductsFromServiceSuccess);

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        console.log(res);
        await productController.allProducts(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProductsModel);
    });

    // it('recebe status 404 quando acha id', async function () {

    it('consegue recuperar um produto pelo id', async function () {
        sinon.stub(productService, 'findById').resolves(allproductsFromServiceSuccess);

        const req = {
            params: { id: 99 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.productById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProductsModel);
    });

    afterEach(function () {
        sinon.restore();
    });
});
