const constants = {
  DATABASE_URI: process.env.DATABASE_URI,

  DATABASES: {
    ROOM: "room",
    ROOM_TYPE: "room_type",
    USER: "user",
  },
  USER_TYPES: {
    USER: "user",
    ADMIN: "admin",
  },
  MESSAGES: {
    FETCHED: "Resource fetched successfully",
    UPDATED: "Resource updated successfully",
    ERROR: "Resource error",
    CREATED: "Resource created successfully",
    DELETED: "Resource deleted successfully",
    UNAUTHORIZE(operate) {
      return `You cannot ${operate} a resource created by another user`;
    },
    NOT_FOUND(resource, resourceId) {
      return `We can't find ${resource} with the given ${resourceId} ID`;
    },
    SUCCESFUL_LOGIN: "Sucessfully logged in",
    LOGIN_FAILURE: "Unable to login. Username or password incorrect",
  },
  errorMessage(data) {
    return { message: this.MESSAGES.NOT_FOUND, success: false, data };
  },
};

module.exports = constants;
