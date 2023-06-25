const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
require("dotenv").config();

const courseSchema = new mongoose.Schema({
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
  week: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

function validate(course) {
  const schema = Joi.object({
    courseTitle: Joi.string().min(4).max(255).required(),
    description: Joi.string().min(4).max(255).required(),
    week: Joi.number().min(1).max(52).required(),
    learningTrack: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(course);
}

function validatePatch(task) {
  const schema = Joi.object({
    courseTitle: Joi.string(),
    description: Joi.string().min(4).max(255),
    week: Joi.number().min(1).max(52),
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

const videoTypeValidator = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string()
    .valid("video/mp4", "video/x-matroska", "video/avi")
    .required(),
  size: Joi.number().required(),
  buffer: Joi.required(),
});

exports.Course = Course;
exports.videoTypeValidator = videoTypeValidator;
exports.validate = validate;
exports.validatePatch = validatePatch;
