const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isDeleted: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

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
    courseId: Joi.objectId(),
    description: Joi.string().min(4).max(255),
    dueDate: Joi.date().iso(),
  });

  return schema.validate(task);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Task = Task;
