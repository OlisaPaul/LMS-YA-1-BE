const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middleware/validate.middleware");
const educator = require("../middleware/educator.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { validate, validatePatch } = require("../model/score.model");
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const scoreController = require("../controllers/score.controllers");
const studentMiddleware = require("../middleware/student.middleware");

// This is used for registering a new score.
router.post(
  "/",
  auth,
  admin,
  validateMiddleware(validate),
  asyncMiddleware(scoreController.addNewScore)
);

router.get("/", asyncMiddleware(scoreController.fetchAllScores));

router.get(
  "/userId/:id",
  validateObjectId,
  asyncMiddleware(scoreController.getScoreByUserId)
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(scoreController.gethScoreById)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a score.
  auth,
  admin,
  validateMiddleware(validatePatch),
  asyncMiddleware(scoreController.updateScoreById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(scoreController.deleteScore)
);
module.exports = router;
