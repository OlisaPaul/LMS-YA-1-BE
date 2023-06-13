const _ = require("lodash");
const { Course } = require("../model/course.model");
const { Task } = require("../model/task.model");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.services");
const courseService = require("../services/course.services");
const taskService = require("../services/task.services");

class TaskController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new task
  async addNewTask(req, res) {
    // Checks if a user already exist by using the email id
    const course = await Course.findById(req.body.courseId);

    if (!course) return res.status(404).send(errorMessage(course, "course"));

    let task = new Task(
      _.pick(req.body, ["courseId", "description", "dueDate"])
    );

    task = await taskService.createTask(task);

    res.send(successMessage(MESSAGES.CREATED, task));
  }

  //get course from the database, using their email
  async gethTaskById(req, res) {
    const task = await taskService.getTaskById(req.params.id);

    if (task) {
      res.send(successMessage(MESSAGES.FETCHED, task));
    } else {
      res.status(404).send(errorMessage("task"));
    }
  }

  async getTaskByCourseId(req, res) {
    const course = await courseService.getCourseById(req.params.courseId);
    if (!course) return errorMessage(course, "course");

    const task = await taskService.getTaskByCourseId(req.params.courseId);

    if (task) {
      res.send(successMessage(MESSAGES.FETCHED, task));
    } else {
      res.status(404).send(errorMessage("task", "course"));
    }
  }

  //get all tasks in the task collection/table
  async fetchAllTasks(req, res) {
    const tasks = await taskService.getAllTasks();

    res.send(successMessage(MESSAGES.FETCHED, tasks));
  }

  //Update/edit task data
  async updateTaskById(req, res) {
    let task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).send(errorMessage("task"));

    const course = await courseService.getCourseById(req.body.courseId);
    if (req.body.courseId && !course)
      return res.status(404).send(errorMessage("course"));

    task = req.body;

    const updatedTask = await taskService.updateTaskById(req.params.id, task);

    res.send(successMessage(MESSAGES.UPDATED, updatedTask));
  }

  //Delete task account entirely from the database
  async deleteTask(req, res) {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) return res.status(404).send(errorMessage("task"));

    await taskService.deleteTask(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, task));
  }
}

module.exports = new TaskController();
