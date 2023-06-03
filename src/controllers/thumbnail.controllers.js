const _ = require("lodash");
const { Thumbnail } = require("../model/thumbnail.model");
const thumbnailService = require("../services/thumbnail.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");

class ThumbnailController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
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
      res.status(404).send(errorMessage(thumbnail, "thumbnail"));
    }
  }

  async gethThumbnailByLearningTrack(req, res) {
    let learningTrack = req.params.learningTrack;
    if (learningTrack) learningTrack = learningTrack.toLowerCase();

    const thumbnail = await thumbnailService.getThumbnailsByLearningTrack(
      req.params.learningTrack
    );

    const learningTrackLists = [
      "backend",
      "frontend",
      "web3",
      "product design",
    ];

    if (!learningTrackLists.includes(learningTrack))
      return res
        .status(400)
        .send({ success: false, message: "Invalid learning track" });

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

    if (!thumbnail)
      return res.status(404).send(errorMessage(thumbnail, "thumbnail"));

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

    if (!thumbnail)
      return res.status(404).send(errorMessage(thumbnail, "thumbnail"));

    await thumbnailService.deleteThumbnail(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, thumbnail));
  }
}

module.exports = new ThumbnailController();
