const { MESSAGES } = require("../common/constants.common");
// when the router handler function is passed as an argument to this function,
// it helps to handle the rejected promise of the handler function
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      // this passes control to the next middleware function (error) and takes exception as an argument
      res.send({ message: ex.message || MESSAGES.ERROR, success: false });
      next(ex);
    }
  };
};
