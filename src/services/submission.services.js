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
      .populate("studentId")
      .populate("taskId");
  }

  async getSubmissionByTaskId(taskId) {
    return await Submission.findOne({ taskId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getSubmissionByUserId(studentId) {
    return await Submission.findOne({ studentId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getSubmissionByTaskIdAndUserId(taskId, studentId) {
    return await Submission.findOne({ taskId, studentId, isDeleted: undefined })
      .populate("studentId")
      .populate("taskId");
  }

  async getAllSubmissions() {
    return await Submission.find({ isDeleted: undefined })
      .sort({ _id: -1 })
      .populate("studentId")
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
