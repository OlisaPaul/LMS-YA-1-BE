const { Course } = require("../model/course.model");

class CourseService {
  //Create new course
  async createCourse(course) {
    return await course.save();
  }

  async getAllCourses() {
    return await Course.find({ isDeleted: undefined }).sort({ _id: -1 });
  }

  async getCourseById(courseId) {
    return await Course.findOne({
      _id: courseId,
      isDeleted: undefined,
    });
  }

  async getCoursesByLearningTrack(learningTrack) {
    return await Course.find({ learningTrack, isDeleted: undefined }).sort({
      _id: -1,
    });
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

  // async softDeleteCourse(id) {
  //   const course = await Course.findById(id);

  //   course.isDeleted = true;

  //   return await course.save();
  // }
}

module.exports = new CourseService();
