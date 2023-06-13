const { Video } = require("../model/video.model");

class VideoService {
  //Create new video
  async createVideo(video) {
    return await video.save();
  }

  async getVideoById(videoId) {
    return await Video.findOne({
      _id: videoId,
      isDeleted: undefined,
    });
  }

  async getAllVideos() {
    return await Video.find();
  }

  async getVideosByLearningTrack(learningTrack) {
    return await Video.find({ learningTrack, isDeleted: undefined }).sort({
      _id: -1,
    });
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
