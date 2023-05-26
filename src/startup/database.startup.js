require("dotenv").config();
const mongoose = require("mongoose");

module.exports = function () {
  // Intiallizes the db URI
  const db = process.env.dbUri;
  // To connect to the mongodb database.
  // Then is called when the promise is fufiled and catch is called when the promise is rejected.
  mongoose
    .connect(db)
    .then(() => console.info(`Connected to database...`))
    .catch(() => console.log("Database not connected"));
};
