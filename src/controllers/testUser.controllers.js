const _ = require("lodash");
const { TestUser } = require("../model/testUser.model");
const testUserService = require("../services/testUser.services");
const { MESSAGES } = require("../common/constants.common");

const {
  errorMessage,
  successMessage,
} = require("../common/messages.common");

class TestUserController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new testUser
  async register(req, res) {
    // Checks if a testUser already exist by using the email id
    let testUser = await TestUser.findOne({ email: req.body.email });
    if (testUser)
      return res
        .status(400)
        .send({ success: false, message: "TestUser already registered" });

    testUser = new TestUser(
      _.pick(req.body, [
        "firstName",
        "lastName",
        "password",
        "email",
        "learningTrack",
      ])
    );
    
   testUser.learningTrack = testUser.learningTrack.toLowerCase()

    // it creates a token which is sent as an header to the client
    const token = testUser.generateAuthToken();
    
    testUser = await testUserService.createTestUser(testUser);

    testUser = _.pick(testUser, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "learningTrack",
    ]);

    res
      .header("x-auth-header", token)
      .header("access-control-expose-headers", "x-auth-token")
      // It determines what is sent back to the client
      .send(successMessage(MESSAGES.CREATED, testUser));
  }

  //get testUser from the database, using their email
  async gethTestUserById(req, res) {
    const testUser = await testUserService.getTestUserById(req.params.id);

    if (testUser) {
      res.send(successMessage(MESSAGES.FETCHED, testUser));
    } else {
      res.status(404).send(errorMessage(testUser, "testUser"));
    }
  }

  //get all testUsers in the testUser collection/table
  async fetchAllTestUsers(req, res) {
    const testUsers = await testUserService.getAllTestUsers();

    res.send(successMessage(MESSAGES.FETCHED, testUsers));
  }

}

module.exports = new TestUserController();
