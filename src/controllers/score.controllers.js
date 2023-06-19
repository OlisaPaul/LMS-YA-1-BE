const _ = require("lodash");
const mongoose = require("mongoose");
require("dotenv").config();
const Fawn = require("../fawn");
const { Score } = require("../model/score.model");
const scoreService = require("../services/score.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.services");
const taskService = require("../services/task.services");
const courseService = require("../services/course.services");
const scoredTasksPerTrackService = require("../services/scoredTasksPerTrack.services");

const db = process.env.dbUri;
mongoose.connect(db);

Fawn.init(mongoose);

class ScoreController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new score
  async addNewScore(req, res) {
    const { studentId, taskId } = req.body;

    // Checks if a student exist
    const [[student], task, [scoredTasksPerTrack]] = await Promise.all([
      userService.getStudentById(studentId),
      taskService.getTaskById(taskId),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
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

    //const scoredTasksPerTrack = await processScoredTask(task, course);

    if (!scoredTasksPerTrack.taskIds.includes(task._id)) {
      scoredTasksPerTrack.taskIds.push(task._id);

      const learningTrack = course.learningTrack;

      if (!learningTrack || !Array.isArray(learningTrack))
        throw new Error("Invalid learning track");

      // Increment scoredTasksPerTrack for each matching learning track
      for (let track of learningTrack) {
        if (track == "product design") track = "productDesign";
        scoredTasksPerTrack[track]++;
      }
    }

    const totalTaskPerTrack = scoredTasksPerTrack[learningTrack];

    let score = new Score(_.pick(req.body, ["studentId", "taskId", "score"]));

    const updatedTotalScore = (student.totalScore =
      student.totalScore + score.score);

    const grade = updatedTotalScore / totalTaskPerTrack;

    const fawnTask = Fawn.Task();

    // this is to make sure all the affected collections are affected as a unit,
    // so if one fails the changes on others is rolled back
    try {
      // Updating scoredTasksPerTrack
      fawnTask.update(
        "scoredtaskspertracks",
        { _id: scoredTasksPerTrack._id },
        {
          frontend: scoredTasksPerTrack.frontend,
          backend: scoredTasksPerTrack.backend,
          web3: scoredTasksPerTrack.web3,
          productDesign: scoredTasksPerTrack.productDesign,
          taskIds: scoredTasksPerTrack.taskIds,
        }
      );

      // Creating score
      fawnTask.save("scores", score);

      // Updating user
      fawnTask.update(
        "users",
        { _id: student._id },
        {
          totalScore: updatedTotalScore,
          grade,
        }
      );

      // Execute the transaction
      await fawnTask.run();
    } catch (error) {
      // Handle error
      console.error(error);
      return res.send({ success: false, message: "Something failed" });
    }

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
