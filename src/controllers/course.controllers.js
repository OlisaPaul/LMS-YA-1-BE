const _ = require("lodash");
const { Course } = require("../model/course.model");
const { User } = require("../model/user.model");
const courseService = require("../services/course.service");
const { MESSAGES } = require("../common/constants.common");

const { errorMessage, successMessage } = require("../common/messages.common");
const userService = require("../services/user.service");

class CourseController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new course
  async addNewCourse(req, res) {
    const educator = await User.findById(req.body.educatorId);

    if (!educator)
      return res.status(404).send(errorMessage(educator, "educator"));

    let course = new Course(
      _.pick(req.body, ["educatorId", "courseContent", "learningTrack"])
    );

    course = await courseService.createCourse(course);

    res.send(successMessage(MESSAGES.CREATED, course));
  }

  //get course from the database, using their email
  async gethCourseById(req, res) {
    const course = await courseService.getCourseById(req.params.id);

    if (course) {
      res.send(successMessage(MESSAGES.FETCHED, course));
    } else {
      res.status(404).send(errorMessage(course, "course"));
    }
  }

  async getCourseByUserId(req, res) {
    const educator = await userService.getUserById(req.params.educatorId);
    if (!educator) return errorMessage(educator, "educator");

    const course = await courseService.getCourseByUserId(req.params.educatorId);

    if (course) {
      res.send(successMessage(MESSAGES.FETCHED, course));
    } else {
      res.status(404).send(errorMessageCourseName());
    }
  }

  //get all courses in the course collection/table
  async fetchAllCourses(req, res) {
    const courses = await courseService.getAllCourses();

    res.send(successMessage(MESSAGES.FETCHED, courses));
  }

  //Update/edit course data
  async updateCourseById(req, res) {
    let course = await courseService.getCourseById(req.params.id);

    if (!course) return res.status(404).send(errorMessage(course, "course"));

    course = req.body;

    updatedCourse = await courseService.updateCourseById(req.params.id, course);

    res.send(successMessage(MESSAGES.UPDATED, course));
  }

  //Delete course account entirely from the database
  async deleteCourse(req, res) {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) return res.status(404).send(errorMessage(course, "course"));

    await courseService.deleteCourse(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, course));
  }
}

module.exports = new CourseController();
