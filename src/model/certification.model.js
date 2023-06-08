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
    type: [String],
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
  });

  return schema.validate(certificate);
}

function validatePatch(task) {
  const schema = Joi.object({
    name: Joi.string(),
    cohort: Joi.string().min(4).max(255),
    learningTrack: Joi.array()
      .items(
        Joi.string()
          .valid("backend", "frontend", "product design", "web3")
          .insensitive()
      )
      .min(1),
  });

  return schema.validate(task);
}

exports.Certificate = Certificate;
exports.validate = validate;
exports.validatePatch = validatePatch;
