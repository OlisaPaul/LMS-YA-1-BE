const validateMiddleware = require("../middleware/validate.middleware");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const { validate, validatePatch } = require("../model/thumbnail.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const thumbnailController = require("../controllers/thumbnail.controllers");

// This is used for registering a new thumbnail.
router.post(
  "/",
  auth,
  admin,
  validateMiddleware(validate),
  asyncMiddleware(thumbnailController.addNewThumbnail)
);

router.get("/", asyncMiddleware(thumbnailController.fetchAllThumbnails));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(thumbnailController.gethThumbnailById)
);

router.get(
  "/learningTrack/:learningTrack",
  asyncMiddleware(thumbnailController.gethThumbnailByLearningTrack)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a thumbnail.
  auth,
  admin,
  validateMiddleware(validatePatch),
  asyncMiddleware(thumbnailController.updateThumbnailProfile)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(thumbnailController.deleteThumbnailAccount)
);
module.exports = router;
