const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    min: 0,
    max: 100,
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

  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
  },
  isDeleted: Boolean,
});

const Score = mongoose.model("Score", scoreSchema);

function validate(score) {
  const schema = Joi.object({
    taskId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    submissionId: Joi.objectId().required(),
    score: Joi.number().min(0).max(100).required(),
  });

  return schema.validate(score);
}

function validatePatch(score) {
  const schema = Joi.object({
    taskId: Joi.objectId(),
    studentId: Joi.objectId(),
    submissionId: Joi.objectId(),
    score: Joi.number().min(0).max(100),
  });

  return schema.validate(score);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Score = Score;
