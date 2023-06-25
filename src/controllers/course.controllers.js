const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const _ = require("lodash");
const { Course } = require("../model/course.model");
const courseService = require("../services/course.services");
const { MESSAGES } = require("../common/constants.common");
const { errorMessage, successMessage } = require("../common/messages.common");

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dejxb00g5",
  api_key: "355873373978724",
  api_secret: "fT3ADDnNmdTK5xP-JTpLk4Yn7q4",
});

class CourseController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new course
  async uploadCourse(req, res) {
    try {
      const { courseTitle, description, learningTrack, week } = req.body;
      const fileBuffer = req.file.buffer;

      // Create a Cloudinary upload stream with specified options
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "foo",
        },
        async function (error, result) {
          if (error) {
            console.error("Error uploading video:", error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const videoUrl = result.secure_url;

            const learningTrackToArray = learningTrack.toLowerCase().split(",");

            // Create the video document and save it to MongoDB
            const course = new Course({
              courseTitle,
              description,
              learningTrack: learningTrackToArray,
              week,
              videoUrl,
            });
            await courseService.createCourse(course);

            res.send({ message: MESSAGES.FETCHED, course });
          }
        }
      );

      // Pipe the file buffer to the Cloudinary upload stream
      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //get course from the database, using their email
  async gethCourseById(req, res) {
    const course = await courseService.getCourseById(req.params.id);

    if (course) {
      res.send(successMessage(MESSAGES.FETCHED, course));
    } else {
      res.status(404).send(errorMessage("course"));
    }
  }

  async getCoursesByLearningTrack(req, res) {
    const courses = await courseService.getCoursesByLearningTrack(
      req.params.learningTrack
    );

    if (!courses || courses.length == 0)
      return res.status(404).send({
        success: false,
        message: "No course for this learning track",
      });

    res.send(successMessage(MESSAGES.FETCHED, courses));
  }

  async getCoursesByLearningTrackAndWeek(req, res) {
    let { week, learningTrack } = req.params;

    if (learningTrack) learningTrack = learningTrack.toLowerCase();

    const courses = await courseService.getCoursesByLearningTrackAndWeek(
      learningTrack,
      week
    );

    if (!courses || courses.length == 0)
      return res.status(404).send({
        success: false,
        message: "No course for this learning track and week.",
      });

    res.send(successMessage(MESSAGES.FETCHED, courses));
  }

  //get all courses in the course collection/table
  async fetchAllCourses(req, res) {
    const courses = await courseService.getAllCourses();

    res.send(successMessage(MESSAGES.FETCHED, courses));
  }

  //Update/edit course data
  async updateCourseById(req, res) {
    let course = await courseService.getCourseById(req.params.id);

    if (!course) return res.status(404).send(errorMessage("course"));

    course = req.body;

    const updatedCourse = await courseService.updateCourseById(
      req.params.id,
      course
    );

    res.send(successMessage(MESSAGES.UPDATED, updatedCourse));
  }

  //Delete course account entirely from the database
  async deleteCourse(req, res) {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) return res.status(404).send(errorMessage("course"));

    await courseService.deleteCourse(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, course));
  }
}

module.exports = new CourseController();
