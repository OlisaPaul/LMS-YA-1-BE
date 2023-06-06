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
    learningTrack: Joi.array()
      .items(
        Joi.string()
          .valid("backend", "frontend", "product design", "web3")
          .insensitive()
      )
      .min(1)
      .required(),
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

exports.Course = Course;
exports.validate = validate;
exports.validatePatch = validatePatch;
