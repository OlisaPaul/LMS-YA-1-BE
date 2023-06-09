// This file determines which of the routes will be used based on the api url
const express = require("express");
const cors = require("cors");
const error = require("../middleware/error.middleware");
const auth = require("../routes/auth.routes");
const courses = require("../routes/courses.routes");
const certificates = require("../routes/certificates.routes");
const scores = require("../routes/scores.routes");
const submissions = require("../routes/submissions.routes");
const tasks = require("../routes/tasks.routes");
const testUsers = require("../routes/testUsers.routes");
const thumbnails = require("../routes/thumbnails.routes");
const users = require("../routes/users.routes");
const videos = require("../routes/videos.routes");

module.exports = function (app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // if the api is {{baseUrl}}/api/v1/posts, it uses the posts method in the router object

  app.use("/api/v1/auth", auth);
  app.use("/api/v1/courses", courses);
  app.use("/api/v1/certificates", certificates);
  app.use("/api/v1/scores", scores);
  app.use("/api/v1/submissions", submissions);
  app.use("/api/v1/tasks", tasks);
  app.use("/api/v1/thumbnails", thumbnails);
  app.use("/api/v1/testUsers", testUsers);
  app.use("/api/v1/users", users);
  app.use("/api/v1/videos", videos);

  // it calls the error middleware if there was a rejected promise.
  app.use(error);
};
