const _ = require("lodash");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true,
    required: true,
  },
  isAdmin: Boolean,
  isDeleted: Boolean,
  avatarUrl: {
    type: String,
    required: true,
  },
  avatarImgTag: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  learningTrack: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  eth: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      avatarUrl: this.avatarUrl,
      learningTrack: this.learningTrack,
      totalScore: this.totalScore,
    },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(255).required(),
    lastName: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
    email: Joi.string().email().min(5).max(255).required(),
    userName: Joi.string().min(4).max(255).required(),
    eth: Joi.string().min(4).max(255).required(),
    learningTrack: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
    role: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("student", "educator")
      .insensitive(),
  });

  return schema.validate(user);
}

function validatePatch(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(255),
    lastName: Joi.string().min(4).max(255),
    password: Joi.string().min(5).max(1024),
    userName: Joi.string().min(4).max(255),
    eth: Joi.string().min(4).max(255).required(),
    email: Joi.string().email().min(5).max(255),
    learningTrack: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("backend", "frontend", "product design", "web3")
      .insensitive(),
    role: Joi.string()
      .min(4)
      .max(255)
      .required()
      .valid("student", "educator")
      .insensitive(),
  });

  return schema.validate(user);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.User = User;
