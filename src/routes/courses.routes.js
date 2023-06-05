const validateMiddleware = require("../middleware/validate.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { validate, validatePatch } = require("../model/course.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const courseController = require("../controllers/course.controllers");
const videoController = require("../controllers/video.controllers");
const multer = require("multer");
const validLearningtrackMiddleware = require("../middleware/validLearningtrack.middleware");
const upload = multer({ storage: multer.memoryStorage() });

// This is used for registering a new course.
router.post(
  "/",
  upload.single("video"),
  auth,
  admin,
  validateMiddleware(validate),
  asyncMiddleware(courseController.uploadCourse)
);

router.get("/", asyncMiddleware(courseController.fetchAllCourses));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(courseController.gethCourseById)
);

router.get(
  "/learningTrack/:learningTrack",
  validLearningtrackMiddleware,
  asyncMiddleware(courseController.getCoursesByLearningTrack)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a course.
  auth,
  admin,
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
