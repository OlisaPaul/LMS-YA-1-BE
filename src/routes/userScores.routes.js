const express = require("express");
const app = express();

// Assuming you have defined the schemas and models for User, Task, and Score

// Endpoint to fetch total score for each user
app.get("/users/scores", async (req, res) => {
  try {
    const scores = await Score.aggregate([
      // Group scores by student
      {
        $group: {
          _id: "$student_id",
          totalScore: { $sum: "$score" },
          tasks: { $addToSet: "$task_id" },
        },
      },
      // Populate student details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },
      // Populate task details
      {
        $lookup: {
          from: "tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "taskDetails",
        },
      },
      // Project desired fields
      {
        $project: {
          _id: 0,
          student: { $arrayElemAt: ["$student", 0] },
          tasks: "$taskDetails",
          totalScore: 1,
        },
      },
    ]);

    res.json(scores);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
