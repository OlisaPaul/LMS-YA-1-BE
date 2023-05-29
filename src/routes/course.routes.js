const validateMiddleware = require("../middleware/validate.middleware");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validate, validatePatch } = require("../model/course.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const courseController = require("../controllers/course.controllers");

// This is used for registering a new course.
router.post(
  "/",
  validateMiddleware(validate),
  asyncMiddleware(courseController.addNewCourse)
);

router.get("/", asyncMiddleware(courseController.fetchAllCourses));

router.get(
  "/userId/:id",
  validateObjectId,
  asyncMiddleware(courseController.getCourseByUserId)
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(courseController.gethCourseById)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a course.
  auth,
  validateMiddleware(validatePatch),
  asyncMiddleware(courseController.updateCourseById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(courseController.deleteCourse)
);
module.exports = router;
