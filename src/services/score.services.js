const { Score } = require("../model/score.model");
const bcrypt = require("bcrypt");

class ScoreService {
  //Create new score
  async createScore(score) {
    return await score.save();
  }

  async getScoreById(scoreId) {
    return await Score.findOne({
      _id: scoreId,
      isDeleted: undefined,
    })
      .populate("studentId")
      .populate("taskId");
  }

  async getScoreByTaskId(taskId) {
    return await Score.findOne({ taskId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getScoreByUserId(studentId) {
    return await Score.findOne({ studentId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getScoreByTaskIdAndUserId(taskId, studentId) {
    return await Score.findOne({ taskId, studentId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getAllScores() {
    return await Score.find({ isDeleted: undefined })
      .sort({ _id: -1 })
      .populate("studentId")
      .populate("taskId");
  }

  async updateScoreById(id, score) {
    return await Score.findByIdAndUpdate(
      id,
      {
        $set: score,
      },
      { new: true }
    );
  }

  async deleteScore(id) {
    return await Score.findByIdAndRemove(id);
  }

  async softDeleteScore(id) {
    const score = await Score.findById(id);

    score.isDeleted = true;

    return await score.save();
  }
}

module.exports = new ScoreService();
