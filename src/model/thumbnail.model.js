const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
require("dotenv").config();

const thumbnailSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  learningTrack: {
    type: String,
    required: true,
  },
  thumbnailUrl: String,
});

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

function validate(thumbnail) {
  const schema = Joi.object({
    courseTitle: Joi.string().min(4).max(255).required(),
    week: Joi.number().min(1).max(52).required(),
    learningTrack: Joi.string()
      .min(4)
      .valid("backend", "frontend", "product design", "web3")
      .insensitive()
      .required(),
  });

  return schema.validate(thumbnail);
}

function validatePatch(thumbnail) {
  const schema = Joi.object({
    courseTitle: Joi.string().min(4).max(255),
    week: Joi.string().min(4).max(255),
    learningTrack: Joi.string()
      .min(4)
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(thumbnail);
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

exports.imageSchema = imageSchema;
exports.Thumbnail = Thumbnail;
exports.validate = validate;
exports.validatePatch = validatePatch;
