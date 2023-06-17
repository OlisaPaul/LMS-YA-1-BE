async function addNewScore(req, res) {
  const { studentId, submissionId, taskId } = req.body;

  const student = await userService.getStudentById(studentId);
  if (!student) return res.status(404).send(errorMessage(student, "student"));

  const submission = await submissionService.getSubmissionById(submissionId);
  if (!submission) return res.status(404).send(errorMessage("submission"));

  const task = await taskService.getTaskById(taskId);
  if (!task) return res.status(404).send(errorMessage("task"));

  const userScorePerTask = await scoreService.getScoreByTaskIdAndUserId(
    task._id,
    student._id
  );

  if (userScorePerTask) {
    return res.status(400).send({
      success: false,
      message:
        "The score has already been added for this student for this particular task.",
    });
  }

  const scoredTasksPerTrack =
    await scoredTasksPerTrackService.getScoredTasksPerTrack();

  if (!scoredTasksPerTrack.taskIds.includes(task._id)) {
    scoredTasksPerTrack.taskIds.push(task._id);

    const course = await courseService.getCourseById(task.courseId);

    if (!course.learningTrack.includes(student[0].learningTrack)) {
      return res.status(400).send({
        success: false,
        message: "You cannot submit a score for a different learning track",
      });
    }

    const learningTrack = course.learningTrack;

    if (!learningTrack || !Array.isArray(learningTrack)) {
      throw new Error("Invalid learning track");
    }

    const scoredTasksPerTrackId = scoredTasksPerTrack._id;

    const updateScoredTasksPerTrack = {
      frontend: 0,
      backend: 0,
      productDesign: 0,
      web3: 0,
    };

    for (const track of learningTrack) {
      updateScoredTasksPerTrack[track]++;
    }

    await scoredTasksPerTrackService.updateScoredTasksPerTrackById(
      scoredTasksPerTrackId,
      updateScoredTasksPerTrack
    );

    return scoredTasksPerTrack;
  }

  const learningTrack =
    student.learningTrack === "product design"
      ? "productDesign"
      : student.learningTrack;

  const totalTaskPerTrack = scoredTasksPerTrack[learningTrack];

  const score = await scoreService.createScore(
    _.pick(req.body, ["studentId", "taskId", "score", "submissionId"])
  );

  const updatedTotalScore = student.totalScore + score.score;

  const grade = updatedTotalScore / totalTaskPerTrack;

  console.log(grade);

  await userService.updateUserById(student._id, {
    totalScore: updatedTotalScore,
    grade,
  });

  res.send(successMessage(MESSAGES.CREATED, score));
}
