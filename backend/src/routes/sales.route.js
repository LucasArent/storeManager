const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/:id', salesController.byIdProductSale);
route.get('/', salesController.allProductSales);

module.exports = route;
