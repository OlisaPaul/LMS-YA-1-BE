const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
require("dotenv").config();

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 0,
  },
  cohort: {
    type: String,
    default: 0,
  },
  learningTrack: {
    type: String,
    required: true,
  },
  certificateUrl: {
    type: String,
    default: 0,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

function validate(certificate) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    cohort: Joi.string().min(4).max(255).required(),
    learningTrack: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive()
      .required(),
  });

  return schema.validate(certificate);
}

const imageSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/gif")
    .required(),
  size: Joi.number().required(),
  buffer: Joi.required(),
});

function validatePatch(task) {
  const schema = Joi.object({
    name: Joi.string(),
    cohort: Joi.string().min(4).max(255),
    learningTrack: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(task);
}

exports.Certificate = Certificate;
exports.imageSchema = imageSchema;
exports.validate = validate;
exports.validatePatch = validatePatch;
