const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const submissionSchema = new mongoose.Schema({
  link: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateSubmitted: {
    type: Date,
    required: true,
  },
  isDeleted: Boolean,
});

const Submission = mongoose.model("Submission", submissionSchema);

function validate(submission) {
  const schema = Joi.object({
    taskId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    description: Joi.string().min(4).max(255).required(),
    dateSubmitted: Joi.date().iso().required(),
    link: Joi.string().required(),
  });

  return schema.validate(submission);
}

function validatePatch(submission) {
  const schema = Joi.object({
    taskId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    description: Joi.string().min(4).max(255).required(),
    dateSubmitted: Joi.date().iso().required(),
    link: Joi.string().required(),
  });

  return schema.validate(submission);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Submission = Submission;
