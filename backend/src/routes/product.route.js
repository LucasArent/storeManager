const route = require('express').Router();
const { productController } = require('../controllers');
const { productValidation } = require('../middlewares/add.validation'); // import pra 6

route.get('/:id', productController.productById);
route.get('/', productController.allProducts);
route.post('/', productValidation, productController.createProduct);

module.exports = route;
