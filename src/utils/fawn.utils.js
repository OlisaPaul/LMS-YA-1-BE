const mongoose = require("mongoose");
const Fawn = require("../fawn");
require("dotenv").config();

const db = process.env.dbUri;
mongoose.connect(db);

Fawn.init(mongoose);

const task = Fawn.Task();

module.exports = task;
