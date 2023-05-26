// this middleware is used to validate the body of the request.
// it takes the models validator as a function and acts as a factory fuction.
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    next();
  };
};
