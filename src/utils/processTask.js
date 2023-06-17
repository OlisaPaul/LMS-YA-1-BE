const scoredTasksPerTrackService = require("../services/scoredTasksPerTrack.services");

async function processTask(task, course) {
  let [scoredTasksPerTrack] =
    await scoredTasksPerTrackService.getScoredTasksPerTrack();

  if (!scoredTasksPerTrack.taskIds.includes(task._id)) {
    scoredTasksPerTrack.taskIds.push(task._id);

    const learningTrack = course.learningTrack;

    if (!learningTrack || !Array.isArray(learningTrack))
      throw new Error("Invalid learning track");

    console.log(learningTrack);
    const scoredTasksPerTrackId = scoredTasksPerTrack._id;

    // Increment scoredTasksPerTrack for each matching learning track
    for (let track of learningTrack) {
      if (track == "product design") track = "productDesign";
      scoredTasksPerTrack[track]++;
    }

    await scoredTasksPerTrackService.updateScoredTasksPerTrackById(
      scoredTasksPerTrackId,
      scoredTasksPerTrack
    );

    return scoredTasksPerTrack;
  }

  return scoredTasksPerTrack;
}

module.exports = processTask;
