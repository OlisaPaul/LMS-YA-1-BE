// This middleware checks if the user is an admin, the highest level of authorization.
// The isAdmin property is only given at the database level for authencity
module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send({ success: false, message: "Access denied" });

  next();
};
