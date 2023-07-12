// const { expect } = require('chai');
// const sinon = require('sinon');
// const productModel = require('../../../src/models');
// const { productService } = require('../../../src/services');
// const { 
//     allProductsDB, 
//     allProductsModel, 
//     productByIDDB, 
//     productByIDModel,
//   } = require('../mocks/product.model.mock');

// describe('teste dos service', function () {
//     it('acha todos os produtos das vendas', async function () {
//         sinon.stub(productModel, 'findProducts').resolves(allProductsDB);

//         const serviceResponse = await productService.getAllProductSales();

//         expect(serviceResponse.status).to.equal('SUCCESSFUL');
//         expect(serviceResponse.data).to.be.deep.equal(allProductsModel);
//     });

//     it('retorna SUCCESSFUL quando acha o produto pelo id', async function () {
//         sinon.stub(productModel, 'findIdProducts').resolves(productByIDDB);

//         const inputData = 2;
//         const serviceResponse = await productService.getProductSalesById(inputData);

//         expect(serviceResponse.status).to.equal('SUCCESSFUL');
//         expect(serviceResponse.data).to.be.deep.equal(productByIDModel);
//     });

//     it('retorna NOT_FOUND quando não acha o produto pelo id', async function () {
//         sinon.stub(productModel, 'findIdProducts').resolves([]);

//         const inputData = 9;
//         const serviceResponse = await productService.getProductSalesById(inputData);

//         expect(serviceResponse.status).to.equal('NOT_FOUND');
//         expect(serviceResponse.data).to.be.deep.equal({ message: 'Sale not found' });
//     });
//         afterEach(function () {
//             sinon.restore();
//     });
// });
