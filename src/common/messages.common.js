const { MESSAGES } = require("./constants.common");

const errorMessage = (resource, resourceId = resource) => {
  return {
    message: MESSAGES.NOT_FOUND(resource, resourceId),
    success: false,
  };
};

const errorMessageUserName = () => {
  return {
    message: "We can't find user with the given userName",
    success: false,
  };
};

const successMessage = (message, data) => {
  return { message, success: true, data };
};

const unAuthMessage = (message) => {
  return { message, success: false };
};

const loginError = () => {
  return { message: MESSAGES.LOGIN_FAILURE, success: false };
};

const loginSuccess = (data) => {
  return { message: MESSAGES.SUCCESFUL_LOGIN, success: true, token: data };
};

exports.errorMessage = errorMessage;
exports.errorMessageUserName = errorMessageUserName;
exports.successMessage = successMessage;
exports.unAuthMessage = unAuthMessage;
exports.loginError = loginError;
exports.loginSuccess = loginSuccess;
