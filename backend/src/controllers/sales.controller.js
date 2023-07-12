const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allProductSales = async (_req, res) => {
    const { status, data } = await salesService.getAllProductSales();
    return res.status(mapStatusHTTP(status)).json(data);
  };
  
  const byIdProductSale = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.getbyIdProductSale(id);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  const createProductSale = async (req, res) => {
    const cadasterSale = req.body;
    const { status, data } = await salesService.createProductSale(cadasterSale);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  module.exports = { allProductSales, byIdProductSale, createProductSale };
