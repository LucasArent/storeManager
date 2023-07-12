const Joi = require('joi');

const schemaProduct = Joi.object({
  name: Joi.string().min(5),
  });
  // required().messages
  //   'string.min': 'INVALID_VALUE$"name" length must be at least 5 characters long',
  //   'any.required': 'REQUIRED_KEY$"name" is required',

const saleSchemaProducts = Joi.array().items(Joi.object({
  productId: Joi.number().min(1).integer(),
  quantity: Joi.number().min(1).integer(),
}));

module.exports = {
  schemaProduct,
  saleSchemaProducts,
};
