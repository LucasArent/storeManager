const connection = require('./connection');
const { getColumns, getPlaceholder } = require('../utils/generateFormattedQuery');

const findProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findIdProducts = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const insertNewProduct = async (products) => {
//  const [{ insertId }] = await connection.execute(query, [...values]);
  const columns = getColumns(products);
  const placeholders = getPlaceholder(products);
  const query = `INSERT INTO products (${columns}) VALUES (${placeholders})`;
  const values = Object.values(products);
  const [{ insertId }] = await connection.execute(query, [...values]);

  return insertId;
};

module.exports = { 
  findProducts, 
  findIdProducts,
  insertNewProduct,
};
