const mongoose = require("mongoose");
const Joi = require("joi");
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
  img: {
    type: String,
    required: true,
  },
  learningTrack: {
    type: String,
    required: true,
  },
});

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

function validate(thumbnail) {
  const schema = Joi.object({
    courseTitle: Joi.string().min(4).max(255).required(),
    week: Joi.number().min(1).max(52).required(),
    img: Joi.string().min(4).required(),
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
    img: Joi.string().min(4),
    learningTrack: Joi.string()
      .min(4)
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(thumbnail);
}

exports.Thumbnail = Thumbnail;
exports.validate = validate;
exports.validatePatch = validatePatch;
