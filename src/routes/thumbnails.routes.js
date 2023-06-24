const express = require("express");
const multer = require("multer");
const validateMiddleware = require("../middleware/validate.middleware");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const {
  validate,
  validatePatch,
  imageSchema,
} = require("../model/thumbnail.model");
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const thumbnailController = require("../controllers/thumbnail.controllers");
const validLearningtrackMiddleware = require("../middleware/validLearningtrack.middleware");
const multerErrorMiddleware = require("../middleware/multerError.middleware");
const validateFileMiddleware = require("../middleware/validateFile.middleware");
const multerCommon = require("../common/multer.common");

const router = express.Router();
const fieldName = "image";
const fileSize = 5;
const upload = multer(multerCommon(multer, fileSize)).single(fieldName);

// This is used for registering a new thumbnail.
router.post(
  "/",
  auth,
  admin,
  multerErrorMiddleware(upload, multer, fileSize, fieldName),
  validateFileMiddleware("Image", imageSchema),
  validateMiddleware(validate),
  asyncMiddleware(thumbnailController.uploadThumbnail)
);

router.get("/", asyncMiddleware(thumbnailController.fetchAllThumbnails));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(thumbnailController.gethThumbnailById)
);

router.get(
  "/learningTrack/:learningTrack",
  validLearningtrackMiddleware,
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
