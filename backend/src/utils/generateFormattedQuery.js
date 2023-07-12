const snakeize = require('snakeize');

const getPlaceholder = (object) => Object.keys(object).map(() => '?').join(',');

const getColumns = (object) => Object.keys(snakeize(object)).join(',');

const getUpdate = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`)
  .join(', ');

module.exports = {
  getColumns,
  getPlaceholder,
  getUpdate,
};
