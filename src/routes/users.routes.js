const validateMiddleware = require("../middleware/validate.middleware");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validate, validatePatch } = require("../model/user.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const userController = require("../controllers/user.controller");

// This is used for registering a new user.
router.post(
  "/",
  validateMiddleware(validate),
  asyncMiddleware(userController.register)
);

router.get("/", asyncMiddleware(userController.fetchAllUsers));

router.get(
  "/username/:username",
  asyncMiddleware(userController.getUserByUsername)
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(userController.gethUserById)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a user.
  auth,
  validateMiddleware(validatePatch),
  asyncMiddleware(userController.updateUserProfile)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(userController.deleteUserAccount)
);
module.exports = router;
