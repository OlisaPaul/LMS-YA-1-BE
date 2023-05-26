const Joi = require("joi");

//Adds mongoose _id validation to joi.
module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
