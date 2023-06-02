const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {Video} = require("../model/video.model")
const videoService = require("../services/video.services");

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dejxb00g5",
  api_key: "355873373978724",
  api_secret: "fT3ADDnNmdTK5xP-JTpLk4Yn7q4",
});

class VideoController {
  async uploadVideo(req, res) {
    try {
      const { title, description } = req.body;
      const videoPath = req.file.path;

      // Upload video to Cloudinary
      const uploadedVideo = await cloudinary.uploader.upload(videoPath, {
        resource_type: "video",
      });

      // Save the Cloudinary URL of the uploaded video in the MongoDB document
      const videoUrl = uploadedVideo.secure_url;

      const video = new Video({ title, description, videoUrl });
      
      await videoService.createVideo(video);

      res.status(201).json(video);
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllVideos()

}

