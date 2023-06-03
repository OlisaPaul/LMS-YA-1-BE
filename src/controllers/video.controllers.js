const cloudinary = require("cloudinary").v2;
const { Video } = require("../model/video.model");
const videoService = require("../services/video.services");
const { MESSAGES } = require("../common/constants.common");
const videoServices = require("../services/video.services");
const { successMessage, errorMessage } = require("../common/messages.common");

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dejxb00g5",
  api_key: "355873373978724",
  api_secret: "fT3ADDnNmdTK5xP-JTpLk4Yn7q4",
});

class VideoController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

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

      res.send(successMessage(MESSAGES.CREATED, video));
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllVideos(req, res) {
    const videos = await videoServices.getAllVideos();

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
  }

  async getVideoById(req, res) {
    const video = await videoServices.getVideoById(req.params.id);

    if (video) {
      res.send(successMessage(MESSAGES.FETCHED, video));
    } else {
      res.status(404).send(errorMessage(video, "video"));
    }
  }

  async deleteVideo(req, res) {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) return res.status(404).send(errorMessage(video, "video"));

    await videoService.deleteVideo(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, video));
  }
}

module.exports = new VideoController();
