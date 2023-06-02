const { Video } = require("../model/video.model");
const bcrypt = require("bcrypt");

class VideoService {
  //Create new video
  async createVideo(video) {
    return await video.save();
  }

  async getVideoById(videoId) {
    return await Video.findOne({
      _id: videoId,
      isDeleted: undefined,
    }).populate("courseId");
  }

  async getAllVideos() {
    return await Video.find({ isDeleted: undefined })
      .sort({ _id: -1 })
      .populate("courseId");
  }

  async updateVideoById(id, video) {
    return await Video.findByIdAndUpdate(
      id,
      {
        $set: video,
      },
      { new: true }
    );
  }

  async deleteVideo(id) {
    return await Video.findByIdAndRemove(id);
  }
}

module.exports = new VideoService();
