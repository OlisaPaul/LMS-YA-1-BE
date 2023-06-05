const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
require("dotenv").config();

const videoSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    default: 0,
  },
  description: {
    type: String,
    default: 0,
  },
  learningTrack: {
    type: [String],
    required: true,
  },
  videoUrl: {
    type: String,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

function validate(video) {
  const schema = Joi.object({
    courseTitle: Joi.string().min(4).max(255).required(),
    description: Joi.string().min(4).max(255).required(),
    learningTrack: Joi.array()
      .items(
        Joi.string()
          .valid("backend", "frontend", "product design", "web3")
          .insensitive()
      )
      .min(1)
      .required(),
  });

  return schema.validate(video);
}

function validatePatch(task) {
  const schema = Joi.object({
    courseTitle: Joi.string(),
    description: Joi.string().min(4).max(255),
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

exports.Video = Video;
exports.validate = validate;
exports.validatePatch = validatePatch;
