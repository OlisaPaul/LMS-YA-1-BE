const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const _ = require("lodash");
const { Thumbnail } = require("../model/thumbnail.model");
const thumbnailService = require("../services/thumbnail.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dumzlw4bf",
  api_key: "369185629596499",
  api_secret: "_9gHrTNy7eYHENzp5Tj45Zpoer8",
});

class ThumbnailController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  async uploadThumbnail(req, res) {
    try {
      const { courseTitle, learningTrack, week } = req.body;

      const fileBuffer = req.file.buffer;

      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "foo",
        },

        async function (error, result) {
          if (error) {
            console.error("Error uploading thumbnail:", error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const thumbnailUrl = result.secure_url;

            // Create the thumbnail document and save it to MongoDB
            let thumbnail = new Thumbnail({
              courseTitle,
              learningTrack,
              week,
              thumbnailUrl,
            });

            thumbnail = await thumbnailService.createThumbnail(thumbnail);

            res.send(successMessage(MESSAGES.CREATED, thumbnail));
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  //Create a new thumbnail
  async addNewThumbnail(req, res) {
    let thumbnail = new Thumbnail(
      _.pick(req.body, ["courseTitle", "learningTrack", "week", "img"])
    );

    thumbnail.learningTrack = thumbnail.learningTrack.toLowerCase();

    thumbnail = await thumbnailService.createThumbnail(thumbnail);

    res.send(successMessage(MESSAGES.CREATED, thumbnail));
  }

  //get all thumbnails in the thumbnail collection/table
  async fetchAllThumbnails(req, res) {
    const thumbnails = await thumbnailService.getAllThumbnails();

    res.send(successMessage(MESSAGES.FETCHED, thumbnails));
  }

  //get thumbnail from the database, using their email
  async gethThumbnailById(req, res) {
    const thumbnail = await thumbnailService.getThumbnailById(req.params.id);

    if (thumbnail) {
      res.send(successMessage(MESSAGES.FETCHED, thumbnail));
    } else {
      res.status(404).send(errorMessage("thumbnail"));
    }
  }

  async gethThumbnailByLearningTrack(req, res) {
    let { learningTrack } = req.params;
    if (learningTrack) learningTrack = learningTrack.toLowerCase();

    const thumbnail = await thumbnailService.getThumbnailsByLearningTrack(
      learningTrack
    );

    if (thumbnail) {
      res.send(successMessage(MESSAGES.FETCHED, thumbnail));
    } else {
      res.status(404).send({
        success: false,
        message: "No thumbnail for this learning track",
      });
    }
  }

  //Update/edit thumbnail data
  async updateThumbnailById(req, res) {
    let thumbnail = await thumbnailService.getThumbnailById(req.params.id);

    if (!thumbnail) return res.status(404).send(errorMessage("thumbnail"));

    thumbnail = req.body;

    updatedThumbnail = await thumbnailService.updateThumbnailById(
      req.params.id,
      thumbnail
    );

    res.send(successMessage(MESSAGES.UPDATED, thumbnail));
  }

  //Delete thumbnail account entirely from the database
  async deleteThumbnail(req, res) {
    const thumbnail = await thumbnailService.getThumbnailById(req.params.id);

    if (!thumbnail) return res.status(404).send(errorMessage("thumbnail"));

    await thumbnailService.deleteThumbnail(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, thumbnail));
  }
}

module.exports = new ThumbnailController();
