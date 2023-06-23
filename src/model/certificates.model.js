const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
require("dotenv").config();
Joi.objectId = require("joi-objectid")(Joi);

const certificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  certificateUrl: {
    type: String,
    default: 0,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

function validate(certificate) {
  const schema = Joi.object({
    studentId: Joi.objectId().required(),
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
    studentId: Joi.objectId().required(),
  });

  return schema.validate(task);
}

exports.Certificate = Certificate;
exports.imageSchema = imageSchema;
exports.validate = validate;
exports.validatePatch = validatePatch;
