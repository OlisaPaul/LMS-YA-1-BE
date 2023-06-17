module.exports = function (req, res, next) {
  let learningTrack = req.params.learningTrack;
  if (learningTrack) learningTrack = learningTrack.toLowerCase();

  const learningTrackLists = ["backend", "frontend", "web3", "product design"];

  if (!learningTrackLists.includes(learningTrack))
    return res
      .status(400)
      .send({ success: false, message: "Invalid learning track" });

  next();
};
