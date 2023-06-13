const { Thumbnail } = require("../model/thumbnail.model");
const bcrypt = require("bcrypt");

class ThumbnailService {
  //Create new thumbnail
  async createThumbnail(thumbnail) {
    return await thumbnail.save();
  }

  async getAllThumbnails() {
    return await Thumbnail.find();
  }

  async getThumbnailById(thumbnailId) {
    return await Thumbnail.findOne({
      _id: thumbnailId,
    });
  }

  async getThumbnailsByLearningTrack(learningTrack) {
    return await Thumbnail.find({
      learningTrack: learningTrack,
    });
  }

  async updateThumbnailById(id, thumbnail) {
    return await Thumbnail.findByIdAndUpdate(
      id,
      {
        $set: thumbnail,
      },
      { new: true }
    );
  }

  async deleteThumbnail(id) {
    return await Thumbnail.findByIdAndRemove(id);
  }
}

module.exports = new ThumbnailService();
