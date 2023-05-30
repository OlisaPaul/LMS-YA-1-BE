const _ = require("lodash");
const { User } = require("../model/user.model");
const userService = require("../services/user.service");
const { MESSAGES } = require("../common/constants.common");

const {
  errorMessage,
  successMessage,
  unAuthMessage,
  errorMessageUserName,
} = require("../common/messages.common");
const generateRandomAvatar = require("../utils/generateRandomAvatar.utils");

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

    user = new User(
      _.pick(req.body, [
        "firstName",
        "lastName",
        "password",
        "email",
        "userName",
        "eth",
        "role",
        "learningTrack",
      ])
    );

    const avatarUrl = await generateRandomAvatar(user.email);
    user.avatarUrl = avatarUrl;
    user.avatarImgTag = `<img src=${avatarUrl} alt=${user._id}>`;

    user.userName = `@${req.body.userName}`;

    user.learningTrack = user.learningTrack.toLowerCase();
    user.role = user.role.toLowerCase();

    user = await userService.createUser(user);

    // it creates a token which is sent as an header to the client
    const token = user.generateAuthToken();

    user = _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "userName",
      "learningTrack",
      "eth",
      "role",
      "avatarUrl",
      "avatarImgTag",
    ]);

    res
      .header("x-auth-header", token)
      .header("access-control-expose-headers", "x-auth-token")
      // It determines what is sent back to the client
      .send(successMessage(MESSAGES.CREATED, user));
  }

  //get user from the database, using their email
  async gethUserById(req, res) {
    const user = await userService.getUserById(req.params.id);

    if (user) {
      res.send(successMessage(MESSAGES.FETCHED, user));
    } else {
      res.status(404).send(errorMessage(user, "user"));
    }
  }

  async getUserByUsername(req, res) {
    const user = await userService.getUserByUsername(req.params.userName);

    if (user) {
      res.send(successMessage(MESSAGES.FETCHED, user));
    } else {
      res.status(404).send(errorMessageUserName());
    }
  }

  //get all users in the user collection/table
  async fetchAllUsers(req, res) {
    const users = await userService.getAllUsers();

    res.send(successMessage(MESSAGES.FETCHED, users));
  }

  //Update/edit user data
  async updateUserProfile(req, res) {
    let user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).send(errorMessage(user, "user"));

    // makes sure the user can only update their account
    if (user._id != req.user._id)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

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

    if (!user) return res.status(404).send(errorMessage(user, "user"));

    // makes sure the user can only delete their account

    // if (req.user._id != user._id)
    //   return res
    //     .status(401)
    //     .send(unAuthMessage(MESSAGES.UNAUTHORIZE("delete")));

    await userService.deleteUser(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, user));
  }
}

module.exports = new UserController();
