const { Video } = require("../model/video.model");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Configure Cloudinary credentials

router.post("/", upload.single("video"));

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();

    // Add the Cloudinary URL to each video object
    const videosWithUrls = videos.map((video) => {
      return {
        _id: video._id,
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
      };
    });

    res.json(videosWithUrls);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
