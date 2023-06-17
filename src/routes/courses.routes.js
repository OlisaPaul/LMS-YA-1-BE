const validateMiddleware = require("../middleware/validate.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const {
  validate,
  validatePatch,
  videoTypeValidator,
} = require("../model/course.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const courseController = require("../controllers/course.controllers");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const validLearningtrackMiddleware = require("../middleware/validLearningtrack.middleware");
const validWeekMiddleware = require("../middleware//validWeek.middleware");
const validateFileMiddleware = require("../middleware/validateFile.middleware");

// This is used for registering a new course.
router.post(
  "/",
  upload.single("video"),
  auth,
  admin,
  validateMiddleware(validate),
  validateFileMiddleware("Video", videoTypeValidator),
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

router.get(
  "/learningTrack/:learningTrack/week/:week",
  validLearningtrackMiddleware,
  validWeekMiddleware,
  asyncMiddleware(courseController.getCoursesByLearningTrackAndWeek)
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
