const { ScoredTasksPerTrack } = require("../model/scoredTasksPerTrack.model");

class ScoredTasksPerTrackService {
  async updateScoredTasksPerTrackById(id, scoredTasksPerTrack) {
    return await ScoredTasksPerTrack.findByIdAndUpdate(
      id,
      {
        $set: scoredTasksPerTrack,
      },
      { new: true }
    );
  }

  async getScoredTasksPerTrackById(scoredTasksPerTrackId) {
    return await ScoredTasksPerTrack.findById(scoredTasksPerTrackId);
  }

  async getScoredTasksPerTrack() {
    return await ScoredTasksPerTrack.find();
  }
}

module.exports = new ScoredTasksPerTrackService();
