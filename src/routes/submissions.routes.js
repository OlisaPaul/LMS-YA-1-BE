const validateMiddleware = require("../middleware/validate.middleware");
const educator = require("../middleware/educator.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { validate, validatePatch } = require("../model/submission.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const submissionController = require("../controllers/submission.controller");

// This is used for registering a new submission.
router.post(
  "/",
  auth,
  educator,
  validateMiddleware(validate),
  asyncMiddleware(submissionController.addNewSubmission)
);

router.get("/", asyncMiddleware(submissionController.fetchAllSubmissions));

router.get(
  "/userId/:id",
  validateObjectId,
  asyncMiddleware(submissionController.getSubmissionByUserId)
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(submissionController.gethSubmissionById)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a submission.
  auth,
  validateMiddleware(validatePatch),
  asyncMiddleware(submissionController.updateSubmissionById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(submissionController.deleteSubmission)
);
module.exports = router;
