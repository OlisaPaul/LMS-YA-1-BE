const mongoose = require("mongoose");
require("dotenv").config();

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 0,
  },
  description: {
    type: String,
    default: 0,
  },
  videoUrl: {
    type: String,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

exports.Video = Video;
