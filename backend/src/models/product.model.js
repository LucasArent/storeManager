const connection = require('./connection');

const findProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findIdProducts = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = { findProducts, findIdProducts };
