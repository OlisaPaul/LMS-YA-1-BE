const _ = require("lodash");
const { Submission } = require("../model/submission.model");
const { Task } = require("../model/task.model");
const { User } = require("../model/user.model");
const submissionService = require("../services/submission.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.service");

class SubmissionController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new user
  async addNewSubmission(req, res) {
    // Checks if a user already exist by using the email id
    const user = await User.findById(req.body.userId);

    if (!user) return res.status(404).send(errorMessage(user, "user"));

    const task = await Task.findById(req.body.taskId);

    if (!task) return res.status(404).send(errorMessage(task, "task"));

    let submission = new Submission(
      _.pick(req.body, ["userId", "taskId", "link", "dateSubmitted"])
    );

    submission = await submissionService.createSubmission(submission);

    res.send(successMessage(MESSAGES.CREATED, submission));
  }

  //get submission from the database, using their email
  async gethSubmissionById(req, res) {
    const submission = await submissionService.getSubmissionById(req.params.id);

    if (submission) {
      res.send(successMessage(MESSAGES.FETCHED, submission));
    } else {
      res.status(404).send(errorMessage(submission, "submission"));
    }
  }

  async getSubmissionByUserId(req, res) {
    const user = await userService.getUserById(req.params.userId);
    if (!user) return errorMessage(user, "user");

    const submission = await submissionService.getSubmissionByUserId(
      req.params.userId
    );

    if (submission) {
      res.send(successMessage(MESSAGES.FETCHED, submission));
    } else {
      res.status(404).send(errorMessageSubmissionName());
    }
  }

  //get all submissions in the submission collection/table
  async fetchAllSubmissions(req, res) {
    const submissions = await submissionService.getAllSubmissions();

    res.send(successMessage(MESSAGES.FETCHED, submissions));
  }

  //Update/edit submission data
  async updateSubmissionById(req, res) {
    let submission = await submissionService.getSubmissionById(req.params.id);

    if (!submission)
      return res.status(404).send(errorMessage(submission, "submission"));

    submission = req.body;

    updatedSubmission = await submissionService.updateSubmissionById(
      req.params.id,
      submission
    );

    res.send(successMessage(MESSAGES.UPDATED, submission));
  }

  //Delete submission account entirely from the database
  async deleteSubmission(req, res) {
    const submission = await submissionService.getSubmissionById(req.params.id);

    if (!submission)
      return res.status(404).send(errorMessage(submission, "submission"));

    await submissionService.deleteSubmission(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, submission));
  }
}

module.exports = new SubmissionController();
