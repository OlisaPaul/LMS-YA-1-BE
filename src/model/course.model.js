const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const courseSchema = new mongoose.Schema({
  courseContent: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  learningTrack: {
    type: [String],
    required: true,
  },
  isDeleted: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

function validate(course) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    courseContent: Joi.string().min(4).max(255).required(),
    learningTrack: Joi.array()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(course);
}

function validatePatch(course) {
  const schema = Joi.object({
    userId: Joi.string(),
    courseContent: Joi.string().min(4).max(255),
    learningTrack: Joi.array()
      .min(4)
      .max(255)
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
  });

  return schema.validate(course);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Course = Course;
