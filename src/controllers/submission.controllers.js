const _ = require("lodash");
const { Submission } = require("../model/submission.model");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.services");
const submissionService = require("../services/submission.services");
const taskService = require("../services/task.services");
const courseService = require("../services/course.services");

class SubmissionController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new subission
  async addNewSubmission(req, res) {
    // Checks if a submission exist
    const student = await userService.getUserById(req.body.studentId);

    if (!student) return res.status(404).send(errorMessage("student"));

    const task = await taskService.getTaskById(req.body.taskId);

    if (!task) return res.status(404).send(errorMessage("task"));

    //makes sure a user cannot submit links for a different learning Track

    const course = await courseService.getCourseById(task.courseId);

    if (!course.learningTrack.includes(student.learningTrack))
      return res.status(400).send({
        success: false,
        message: "You can not submit for a different learning track",
      });

    let submission = new Submission(
      _.pick(req.body, ["studentId", "taskId", "link", "dateSubmitted"])
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
      res.status(404).send(errorMessage("submission"));
    }
  }

  async getSubmissionByUserId(req, res) {
    const student = await userService.getUserById(req.params.studentId);
    if (!student) return errorMessage("student");

    const submission = await submissionService.getSubmissionByUserId(
      req.params.studentId
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

    if (!submission) return res.status(404).send(errorMessage("submission"));

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

    if (!submission) return res.status(404).send(errorMessage("submission"));

    await submissionService.deleteSubmission(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, submission));
  }
}

module.exports = new SubmissionController();
