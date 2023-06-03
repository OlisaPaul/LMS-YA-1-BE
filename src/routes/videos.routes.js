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
const { Video } = require("../model/video.model");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dejxb00g5",
  api_key: "355873373978724",
  api_secret: "fT3ADDnNmdTK5xP-JTpLk4Yn7q4",
});

router.post(
  "/",
  upload.single("video"),
  auth,
  admin,
  //validateMiddleware(validate),
  asyncMiddleware(async (req, res) => {
    try {
      const { title, description } = req.body;
      const fileBuffer = req.file.path;

      // Upload video to Cloudinary
      const uploadedVideo = await cloudinary.uploader.upload(fileBuffer, {
        resource_type: "video",
      });

      // Save the Cloudinary URL of the uploaded video in the MongoDB document
      const videoUrl = uploadedVideo.secure_url;

      // Create the video document and save it to MongoDB
      const video = new Video({ title, description, videoUrl });
      await videoService.createVideo(video);

      res.send({ message: MESSAGES.FETCHED, video });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
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
