const { Course } = require("../model/course.model");

class CourseService {
  //Create new course
  async createCourse(course) {
    return await course.save();
  }

  async getAllCourses() {
    return await Course.find({}).sort({ _id: -1 });
  }

  async getCourseById(courseId) {
    return await Course.findById(courseId);
  }

  async getCoursesByLearningTrack(learningTrack) {
    return await Course.find({ learningTrack }).sort({
      _id: -1,
    });
  }

  async getCoursesByLearningTrackAndWeek(learningTrack, week) {
    return await Course.find({ learningTrack, week }).sort({
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
