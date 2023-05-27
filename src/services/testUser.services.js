const { TestUser } = require("../model/testUser.model");
const bcrypt = require("bcrypt");

class TestUserService {
  //Create new testUser
  async createTestUser(testUser) {
    const salt = await bcrypt.genSalt(10);
    // for hashing the password that is saved the database for security reasons
    testUser.password = await bcrypt.hash(testUser.password, salt);

    return await testUser.save();
  }

  async getTestUserById(testUserId) {
    return await TestUser.findOne({ _id: testUserId, isDeleted: undefined });
  }

  async getAllTestUsers() {
    return await TestUser.find({ isDeleted: undefined }).sort({ _id: -1 });
  }
}

module.exports = new TestUserService();
