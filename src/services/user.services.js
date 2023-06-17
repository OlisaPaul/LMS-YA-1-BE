const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");

class UserService {
  //Create new user
  async createUser(user) {
    const salt = await bcrypt.genSalt(10);
    // for hashing the password that is saved the database for security reasons
    user.password = await bcrypt.hash(user.password, salt);

    return await user.save();
  }

  async getUserById(userId) {
    return await User.findOne({ _id: userId, isDeleted: undefined });
  }

  async getAllStudents() {
    return await User.find({ role: "student", isDeleted: undefined });
  }

  async getStudentById(studentId) {
    return await User.find({ role: "student", _id: studentId });
  }

  async getUserByEmail(email) {
    return await User.findOne({ email, isDeleted: undefined });
  }

  async getUserByUsername(userName) {
    return await User.findOne({ userName, isDeleted: undefined });
  }

  async getAllUsers() {
    return await User.find({ isDeleted: undefined }).sort({ _id: -1 });
  }

  async getUsersByLearningTrack(learningTrack) {
    return await User.find({ learningTrack, isDeleted: undefined }).sort({
      _id: -1,
    });
  }

  async updateUserById(id, user) {
    return await User.findByIdAndUpdate(
      id,
      {
        $set: user,
      },
      { new: true }
    );
  }

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }

  async softDeleteUser(id) {
    const user = await User.findById(id);

    user.isDeleted = true;

    return await user.save();
  }
}

module.exports = new UserService();
