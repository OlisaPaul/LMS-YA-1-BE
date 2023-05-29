const { Submission } = require("../model/submission.model");
const bcrypt = require("bcrypt");

class SubmissionService {
  //Create new submission
  async createSubmission(submission) {
    return await submission.save();
  }

  async getSubmissionById(submissionId) {
    return await Submission.findOne({
      _id: submissionId,
      isDeleted: undefined,
    })
      .populate("userId")
      .populate("taskId");
  }

  async getSubmissionByTaskId(taskId) {
    return await Submission.findOne({ taskId, isDeleted: undefined })
      .populate("userId")
      .populate("taskId");
  }

  async getSubmissionByUserId(userId) {
    return await Submission.findOne({ userId, isDeleted: undefined })
      .populate("userId")
      .populate("taskId");
  }

  async getSubmissionByTaskIdAndUserId(taskId, userId) {
    return await Submission.findOne({ taskId, userId, isDeleted: undefined })
      .populate("userId")
      .populate("taskId");
  }

  async getAllSubmissions() {
    return await Submission.find({ isDeleted: undefined })
      .sort({ _id: -1 })
      .populate("userId")
      .populate("taskId");
  }

  async updateSubmissionById(id, submission) {
    return await Submission.findByIdAndUpdate(
      id,
      {
        $set: submission,
      },
      { new: true }
    );
  }

  async deleteSubmission(id) {
    return await Submission.findByIdAndRemove(id);
  }

  async softDeleteSubmission(id) {
    const submission = await Submission.findById(id);

    submission.isDeleted = true;

    return await submission.save();
  }
}

module.exports = new SubmissionService();
