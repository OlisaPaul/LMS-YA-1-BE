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
    userId: Joi.objectId().required(),
    courseContent: Joi.string().min(4).max(255).required(),
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

function validatePatch(course) {
  const schema = Joi.object({
    userId: Joi.string(),
    courseContent: Joi.string().min(4).max(255),
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

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Course = Course;
