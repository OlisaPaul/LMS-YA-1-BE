const cloudinary = require("cloudinary").v2;
const { Video } = require("../model/video.model");
const videoService = require("../services/video.services");
const { MESSAGES } = require("../common/constants.common");
const { successMessage, errorMessage } = require("../common/messages.common");
const streamifier = require("streamifier");

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
      const { courseTitle, description, learningTrack } = req.body;
      const fileBuffer = req.file.buffer;

      // Create a Cloudinary upload stream with specified options
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "foo",
        },
        async function (error, result) {
          if (error) {
            console.error("Error uploading video:", error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const videoUrl = result.secure_url;

            // Create the video document and save it to MongoDB
            const video = new Video({
              courseTitle,
              description,
              learningTrack,
              videoUrl,
            });
            await videoService.createVideo(video);

            res.send({ message: MESSAGES.FETCHED, video });
          }
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllVideos(req, res) {
    const videos = await videoService.getAllVideos();

    // Add the Cloudinary URL to each video object
    const videosWithUrls = videos.map((video) => {
      return {
        _id: video._id,
        courseTitle: video.courseTitle,
        description: video.description,
        videoUrl: video.videoUrl,
      };
    });

    res.send(successMessage(MESSAGES.FETCHED, videosWithUrls));
  }

  async getVideoById(req, res) {
    const video = await videoService.getVideoById(req.params.id);

    if (video) {
      res.send(successMessage(MESSAGES.FETCHED, video));
    } else {
      res.status(404).send(errorMessage(video, "video"));
    }
  }

  async getVideosByLearningTrack(req, res) {
    const videos = await videoService.getVideosByLearningTrack(
      req.params.learningTrack
    );

    if (!videos || videos.length == 0)
      return res.status(404).send({
        success: false,
        message: "No video for this learning track",
      });

    res.send(successMessage(MESSAGES.FETCHED, videos));
  }

  async deleteVideo(req, res) {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) return res.status(404).send(errorMessage(video, "video"));

    await videoService.deleteVideo(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, video));
  }
}

module.exports = new VideoController();
