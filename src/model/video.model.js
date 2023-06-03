const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 0,
  },
  description: {
    type: String,
    default: 0,
  },
  videoUrl: {
    type: String,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

function validate(task) {
  const schema = Joi.object({
    courseId: Joi.objectId().required(),
    description: Joi.string().min(4).max(255).required(),
    dueDate: Joi.date().iso().required(),
  });

  return schema.validate(task);
}

function validatePatch(task) {
  const schema = Joi.object({
    courseId: Joi.string(),
    description: Joi.string().min(4).max(255),
    dueDate: Joi.date().iso(),
  });

  return schema.validate(task);
}

exports.Video = Video;
exports.validate = validate;
exports.validatePatch = validatePatch;
