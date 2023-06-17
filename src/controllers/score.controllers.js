const _ = require("lodash");
const { Score } = require("../model/score.model");
const scoreService = require("../services/score.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.services");
const taskService = require("../services/task.services");
const courseService = require("../services/course.services");
const scoredTasksPerTrackService = require("../services/scoredTasksPerTrack.services");
const processScoredTask = require("../utils/processTask");

class ScoreController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new score
  async addNewScore(req, res) {
    const { studentId, taskId } = req.body;

    // Checks if a student exist
    const [[student], task] = await Promise.all([
      userService.getStudentById(studentId),
      taskService.getTaskById(taskId),
    ]);

    if (!student) return res.status(404).send(errorMessage("student"));
    if (!task) return res.status(404).send(errorMessage("task"));

    const userScorePerTask = await scoreService.getScoreByTaskIdAndUserId(
      task._id,
      student._id
    );

    if (userScorePerTask)
      return res.status(400).send({
        success: false,
        message:
          "The score has already been added for this student for this particular task.",
      });

    const course = await courseService.getCourseById(task.courseId);

    //makes sure a user cannot have score for a different learning Track
    //console.log(course);

    if (!course.learningTrack.includes(student.learningTrack))
      return res.status(400).send({
        success: false,
        message: "You cannot submit a score for a different learning track",
      });

    const learningTrack =
      student.learningTrack === "product design"
        ? "productDesign"
        : student.learningTrack;

    const scoredTasksPerTrack = await processScoredTask(task, course);

    const totalTaskPerTrack = scoredTasksPerTrack[learningTrack];

    let score = new Score(_.pick(req.body, ["studentId", "taskId", "score"]));
    score = await scoreService.createScore(score);

    const updatedTotalScore = (student.totalScore =
      student.totalScore + score.score);

    const grade = updatedTotalScore / totalTaskPerTrack;

    await userService.updateUserById(student._id, {
      totalScore: updatedTotalScore,
      grade,
    });

    res.send(successMessage(MESSAGES.CREATED, score));
  }

  //get score from the database, using their email
  async gethScoreById(req, res) {
    const score = await scoreService.getScoreById(req.params.id);

    if (score) {
      res.send(successMessage(MESSAGES.FETCHED, score));
    } else {
      res.status(404).send(errorMessage("score"));
    }
  }

  async getScoreByStudentId(req, res) {
    const student = await userService.getUserById(req.params.studentId);
    if (!student) return errorMessage("student");

    const score = await scoreService.getScoreByUserId(req.params.studentId);

    if (score) {
      res.send(successMessage(MESSAGES.FETCHED, score));
    } else {
      res.status(404).send(errorMessageScoreName());
    }
  }

  //get all scores in the score collection/table
  async fetchAllScores(req, res) {
    const scores = await scoreService.getAllScores();

    res.send(successMessage(MESSAGES.FETCHED, scores));
  }

  //Update/edit score data
  async updateScoreById(req, res) {
    let score = await scoreService.getScoreById(req.params.id);

    if (!score) return res.status(404).send(errorMessage("score"));

    score = req.body;

    const updatedScore = await scoreService.updateScoreById(
      req.params.id,
      score
    );

    res.send(successMessage(MESSAGES.UPDATED, updatedScore));
  }

  //Delete score account entirely from the database
  async deleteScore(req, res) {
    const score = await scoreService.getScoreById(req.params.id);

    if (!score) return res.status(404).send(errorMessage("score"));

    await scoreService.deleteScore(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, score));
  }
}

module.exports = new ScoreController();
