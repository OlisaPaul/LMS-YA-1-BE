const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const videoController = require("../controllers/video.controllers");
const asyncMiddleware = require("../middleware/async.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const { validate } = require("../model/video.model");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("video"),
  auth,
  admin,
  validateMiddleware(validate),
  videoController.uploadVideo
);

router.get("/", asyncMiddleware(videoController.getAllVideos));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(videoController.getVideoById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(videoController.deleteVideo)
);

module.exports = router;
