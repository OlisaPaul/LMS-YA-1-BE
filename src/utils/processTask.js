const scoredTasksPerTrackService = require("../services/scoredTasksPerTrack.services");
const courseService = require("../services/course.services");

async function processTask(scoredTasksPerTrack, task, student, res) {
  if (!scoredTasksPerTrack.taskIds.includes(task._id)) {
    scoredTasksPerTrack.taskIds.push(task._id);

    const course = await courseService.getCourseById(task.courseId);

    //makes sure a user cannot have score for a different learning Track

    if (!course.learningTrack.includes(student.learningTrack))
      return res.status(400).send({
        success: false,
        message: "You cannot submit a score for a different learning track",
      });

    const learningTrack = course.learningTrack;

    if (!learningTrack || !Array.isArray(learningTrack))
      throw new Error("Invalid learning track");

    const scoredTasksPerTrackId = scoredTasksPerTrack._id;

    // Increment scoredTasksPerTrack for each matching learning track
    for (const track of learningTrack) {
      if (track === "frontend") {
        scoredTasksPerTrack.frontend++;
      } else if (track === "backend") {
        scoredTasksPerTrack.backend++;
      } else if (track === "product design") {
        scoredTasksPerTrack.productDesign++;
      } else if (track === "web3") {
        scoredTasksPerTrack.web3++;
      }
    }

    await scoredTasksPerTrackService.updateScoredTasksPerTrackById(
      scoredTasksPerTrackId,
      scoredTasksPerTrack
    );
  }
}

module.exports = processTask;
