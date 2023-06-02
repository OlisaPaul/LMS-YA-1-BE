const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const videoController = require("../controllers/video.controllers");
const asyncMiddleware = require("../middleware/async.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const { validate } = require("../model/video.model");
const validateObjectId = require("../middleware/validateObjectId.middleware");

router.post(
  "/",
  auth,
  admin,
  validateMiddleware(validate),
  upload.single("video"),
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
