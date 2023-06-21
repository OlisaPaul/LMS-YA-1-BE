const _ = require("lodash");
const propertiesToPick = require("../common/propertiesToPick.common");

class UserWithGrade {
  getUserWithGrade(user, scoredTasksPerTrack) {
    if (user.role != "student") return user;

    const learningTrack =
      user.learningTrack === "product design"
        ? "productDesign"
        : user.learningTrack;

    const totalTaskPerTrack = scoredTasksPerTrack[learningTrack];

    const totalScore = user.totalScore;

    const grade = totalScore ? totalScore / totalTaskPerTrack : 0;

    const userWithgrade = { ...user, grade };

    const simplifiedUser = _.pick(userWithgrade._doc, propertiesToPick);
    simplifiedUser.grade = grade;

    return simplifiedUser;
  }

  getUsersWithGrade = (users, scoredTasksPerTrack) => {
    const usersWithGrade = users.map((user) => {
      return this.getUserWithGrade(user, scoredTasksPerTrack);
    });

    return usersWithGrade;
  };
}

module.exports = new UserWithGrade();
