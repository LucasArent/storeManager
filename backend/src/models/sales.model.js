const camelize = require('camelize');
const connection = require('./connection');

const allFindSales = async () => {
  const [sales] = await connection.execute(
    `SELECT s.date, sp.sale_id, sp.product_id, sp.quantity 
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(sales);
};

const byIdFindSale = async (saleID) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.sale_id, sp.product_id;`,
    [saleID],
  );
  return camelize(sale);
};
module.exports = { allFindSales, byIdFindSale };
