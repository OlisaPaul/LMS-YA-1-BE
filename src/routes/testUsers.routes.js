const validateMiddleware = require("../middleware/validate.middleware");
const _ = require("lodash");
const { validate, validatePatch } = require("../model/testUser.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const testUserController = require("../controllers/testUser.controllers");

// This is used for registering a new testUser.
router.post(
  "/",
  validateMiddleware(validate),
  asyncMiddleware(testUserController.register)
);

router.get("/", asyncMiddleware(testUserController.fetchAllTestUsers));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(testUserController.gethTestUserById)
);


module.exports = router;
