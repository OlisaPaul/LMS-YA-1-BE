const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../model/user.model");
const userService = require("../services/user.service");
const {
  loginSuccess,
  loginError,
  errorMessage,
} = require("../common/messages.common");

class AuthController {
  //Create a new user
  async logIn(req, res) {
    // checking if the user exist
    let user = await userService.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send(errorMessage(user, "user"));

    //checks if the password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send(loginError());

    const token = user.generateAuthToken();

    // sends token as response to the client after validation
    // Token is used to check if client is logged in or not, it's presence means logged in and vice-versa
    res.send(loginSuccess(token));
  }
}

module.exports = new AuthController();
