const _ = require("lodash");
const { Score } = require("../model/score.model");
const { Task } = require("../model/task.model");
const { User } = require("../model/user.model");
const scoreService = require("../services/score.service");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.service");

class ScoreController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new user
  async addNewScore(req, res) {
    // Checks if a user already exist by using the email id
    const user = await User.findById(req.body.userId);

    if (!user) return res.status(404).send(errorMessage(user, "user"));

    const task = await Task.findById(req.body.taskId);

    if (!task) return res.status(404).send(errorMessage(task, "task"));

    let score = new Score(_.pick(req.body, ["userId", "taskId", "score"]));

    score = await scoreService.createScore(score);

    res.send(successMessage(MESSAGES.CREATED, score));
  }

  //get score from the database, using their email
  async gethScoreById(req, res) {
    const score = await scoreService.getScoreById(req.params.id);

    if (score) {
      res.send(successMessage(MESSAGES.FETCHED, score));
    } else {
      res.status(404).send(errorMessage(score, "score"));
    }
  }

  async getScoreByUserId(req, res) {
    const user = await userService.getUserById(req.params.userId);
    if (!user) return errorMessage(user, "user");

    const score = await scoreService.getScoreByUserId(req.params.userId);

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

    if (!score) return res.status(404).send(errorMessage(score, "score"));

    score = req.body;

    updatedScore = await scoreService.updateScoreById(req.params.id, score);

    res.send(successMessage(MESSAGES.UPDATED, score));
  }

  //Delete score account entirely from the database
  async deleteScore(req, res) {
    const score = await scoreService.getScoreById(req.params.id);

    if (!score) return res.status(404).send(errorMessage(score, "score"));

    await scoreService.deleteScore(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, score));
  }
}

module.exports = new ScoreController();
