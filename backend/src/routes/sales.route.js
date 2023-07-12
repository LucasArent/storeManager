const route = require('express').Router();
const { salesController } = require('../controllers');
const { salesValidation } = require('../middlewares/sales.validations'); // import pra 6

route.get('/:id', salesController.byIdProductSale);
route.get('/', salesController.allProductSales);
route.post('/', salesValidation, salesController.createProductSale);

module.exports = route;
