const { Course } = require("../model/course.model");
const bcrypt = require("bcrypt");

class CourseService {
  //Create new course
  async createCourse(course) {
    return await course.save();
  }

  async getCourseById(courseId) {
    return await Course.findOne({
      _id: courseId,
      isDeleted: undefined,
    });
  }

  async getCourseByUserId(userId) {
    return await Course.findOne({ userId, isDeleted: undefined });
  }

  async getAllCourses() {
    return await Course.find({ isDeleted: undefined }).sort({ _id: -1 });
  }

  async updateCourseById(id, course) {
    return await Course.findByIdAndUpdate(
      id,
      {
        $set: course,
      },
      { new: true }
    );
  }

  async deleteCourse(id) {
    return await Course.findByIdAndRemove(id);
  }

  async softDeleteCourse(id) {
    const course = await Course.findById(id);

    course.isDeleted = true;

    return await course.save();
  }
}

module.exports = new CourseService();
