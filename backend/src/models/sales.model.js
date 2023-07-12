const camelize = require('camelize');
const connection = require('./connection');
const { getPlaceholder, getColumns } = require('../utils/generateFormattedQuery');

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

const addSaleProducts = async (saleID, sales) => {
  const columns = getColumns(sales[0]);
  const placeholder = sales.map((sale) => `(?, ${getPlaceholder(sale)})`).join(', ');

  const values = sales.flatMap((sale) => [saleID, ...Object.values(sale)]);
  const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES ${placeholder};`;
    return connection.execute(query, values);
};

const createSale = async (sale) => {
  const query = 'INSERT INTO sales () VALUES ();';
  const [{ insertId }] = await connection.execute(query, []);
  await addSaleProducts(insertId, sale);
  const registeredSale = {
    id: insertId,
    itemsSold: sale,
  };
  return registeredSale;
};

module.exports = { allFindSales, byIdFindSale, addSaleProducts, createSale };
