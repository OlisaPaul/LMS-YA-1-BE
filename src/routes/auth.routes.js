const validateMiddleware = require("../middleware/validate.middleware");
const authController = require("../controllers/auth.controllers");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

// This is used for authenticating the user
router.post("/", validateMiddleware(validate), authController.logIn);

// for validating the body of the request
function validate(req) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(1024).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
