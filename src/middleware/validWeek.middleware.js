module.exports = function (req, res, next) {
  function isNumber(value) {
    return typeof value === "number" || !isNaN(Number(value));
  }

  const { week } = req.params;
  if (!isNumber(week))
    return res
      .status(400)
      .send({ success: false, message: "Week parameter must be a number" });

  if (week < 1 || week > 52)
    return res.status(400).send({
      success: false,
      message: "Week parameter must between 1 and 52",
    });

  next();
};
