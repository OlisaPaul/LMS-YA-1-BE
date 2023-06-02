const mongoose = require("mongoose");
require("dotenv").config();

const scoredTasksPerTrackSchema = new mongoose.Schema({
  frontend: {
    type: Number,
    default: 0,
  },
  backend: {
    type: Number,
    default: 0,
  },
  productDesign: {
    type: Number,
    default: 0,
  },
  web3: {
    type: Number,
    default: 0,
  },
  taskIds: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

const ScoredTasksPerTrack = mongoose.model(
  "ScoredTasksPerTrack",
  scoredTasksPerTrackSchema
);

exports.ScoredTasksPerTrack = ScoredTasksPerTrack;
