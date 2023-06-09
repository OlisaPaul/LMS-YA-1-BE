const _ = require("lodash");
const { Task } = require("../model/task.model");
const { User } = require("../model/user.model");
const { Score } = require("../model/score.model");
const { Course } = require("../model/course.model");
const userService = require("../services/user.services");
const { MESSAGES } = require("../common/constants.common");
const scoredTasksPerTrackService = require("../services/scoredTasksPerTrack.services");
const propertiesToPick = require("../common/propertiesToPick.common");
const {
  getUserWithGrade,
  getUsersWithGrade,
} = require("../utils/getUserWithGrade.utils");
const { transporter, mailOptions } = require("../utils/email.utils");
const {
  errorMessage,
  errorMessageUserName,
  successMessage,
} = require("../common/messages.common");
const generateRandomAvatar = require("../utils/generateRandomAvatar.utils");
const scoreServices = require("../services/score.services");
const getUserWithGradeUtils = require("../utils/getUserWithGrade.utils");

class UserController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new user
  async register(req, res) {
    // Checks if a user already exist by using the email id
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "User already registered" });

    const userName = await User.findOne({ userName: `@${req.body.userName}` });
    if (userName)
      return res.status(400).send({
        success: false,
        message: "Username has been taken, please use another one",
      });

    user = new User(_.pick(req.body, [...propertiesToPick, "password"]));

    user.learningTrack = user.learningTrack.toLowerCase();

    user = new User(user);

    const avatarUrl = await generateRandomAvatar(user.email);
    user.avatarUrl = avatarUrl;
    user.avatarImgTag = `<img src=${avatarUrl} alt=${user._id}>`;

    user.userName = `@${req.body.userName}`;

    user.learningTrack = user.learningTrack.toLowerCase();
    user.role = user.role.toLowerCase();

    user = await userService.createUser(user);

    // it creates a token which is sent as an header to the client
    const token = user.generateAuthToken();

    user = _.pick(user, propertiesToPick);

    transporter.sendMail(
      mailOptions(user.email, user.firstName),
      (error, info) => {
        if (error) {
          console.error("Error occurred:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      }
    );

    res
      .header("x-auth-header", token)
      .header("access-control-expose-headers", "x-auth-token")
      // It determines what is sent back to the client
      .send(successMessage(MESSAGES.CREATED, user));
  }

  //get user from the database, using their email
  async gethUserById(req, res) {
    let [user, [scoredTasksPerTrack]] = await Promise.all([
      userService.getUserById(req.params.id),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
    ]);

    if (!user) return res.status(404).send(errorMessage("user"));

    const userWithGrade = getUserWithGrade(user, scoredTasksPerTrack);

    res.send(successMessage(MESSAGES.FETCHED, userWithGrade));
  }

  async getUserByUsername(req, res) {
    let userName = req.params.userName;
    if (userName && !userName.startsWith("@")) userName = `@${userName}`;

    let [user, [scoredTasksPerTrack]] = await Promise.all([
      userService.getUserByUsername(userName),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
    ]);

    if (!user) return res.status(404).send(errorMessageUserName());

    const userWithGrade = getUserWithGrade(user, scoredTasksPerTrack);

    res.send(successMessage(MESSAGES.FETCHED, userWithGrade));
  }

  async getTotalScoresPerUser(req, res) {
    const students = await userService.getAllStudents();

    const scores = await Score.aggregate([
      // Group scores by student
      {
        $group: {
          _id: "$studentId",
          totalScore: { $sum: "$score" },
          tasks: { $addToSet: "$taskId" },
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
          student: {
            _id: { $arrayElemAt: ["$student._id", 0] },
            firstName: { $arrayElemAt: ["$student.firstName", 0] },
            lastName: { $arrayElemAt: ["$student.lastName", 0] },
            learningTrack: { $arrayElemAt: ["$student.learningTrack", 0] },
          },
          tasks: "$taskDetails.description",
          totalScore: 1,
        },
      },
    ]);

    const studentsWithoutScores = students
      .filter((student) => {
        const studentId = student._id.toString(); // Convert ObjectId to string
        return !scores.some((score) =>
          score.student[0]._id.toString().includes(studentId)
        );
      })
      .map((student) => {
        return {
          totalScore: 0,
          student: [
            {
              _id: student._id,
              firstName: student.firstName,
              lastName: student.lastName,
              learningTrack: student.learningTrack,
            },
          ],
          tasks: [],
          grade: 0,
        };
      });

    const [taskPerTrack] =
      await scoredTasksPerTrackService.getScoredTasksPerTrack();

    const scoresWithGrade = scores.map(function (score) {
      let learningTrack = score.student[0].learningTrack;
      if (learningTrack == "product design") learningTrack = "productDesign";

      const totalTasksPerTrack = taskPerTrack[learningTrack];

      score.grade = score.totalScore / totalTasksPerTrack;

      return score;
    });

    scoresWithGrade.push(...studentsWithoutScores);

    res.json(scoresWithGrade);
  }
  //get all educators in the user collection/table
  async fetchUserByLearningTrack(req, res) {
    let { learningTrack } = req.params;
    if (learningTrack) learningTrack = learningTrack.toLowerCase();

    let [users, [scoredTasksPerTrack]] = await Promise.all([
      userService.getUsersByLearningTrack(learningTrack),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
    ]);

    const usersWithGrade = getUsersWithGrade(users, scoredTasksPerTrack);

    res.send(successMessage(MESSAGES.FETCHED, usersWithGrade));
  }

  //get all users in the user collection/table
  async fetchAllUsers(req, res) {
    let [users, [scoredTasksPerTrack]] = await Promise.all([
      userService.getAllUsers(),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
    ]);

    const usersWithGrade = getUsersWithGrade(users, scoredTasksPerTrack);

    res.send(successMessage(MESSAGES.FETCHED, usersWithGrade));
  }

  async fetchAllStudents(req, res) {
    let [students, [scoredTasksPerTrack]] = await Promise.all([
      userService.getAllStudents(),
      scoredTasksPerTrackService.getScoredTasksPerTrack(),
    ]);

    const studentsWithGrade = getUsersWithGrade(students, scoredTasksPerTrack);

    res.send(successMessage(MESSAGES.FETCHED, studentsWithGrade));
  }

  //Update/edit user data
  async updateUserProfile(req, res) {
    let user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).send(errorMessage("user"));

    let updatedUser = req.body;

    const avatarUrl = await generateRandomAvatar(user.email);

    updatedUser.avatarUrl = avatarUrl;
    updatedUser.avatarImgTag = `<img src=${avatarUrl} alt=${user._id}>`;

    updatedUser = await userService.updateUserById(req.params.id, updatedUser);

    res.send(successMessage(MESSAGES.UPDATED, updatedUser));
  }

  //Delete user account entirely from the database
  async deleteUserAccount(req, res) {
    const user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).send(errorMessage("user"));

    await userService.deleteUser(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, user));
  }
}

module.exports = new UserController();
