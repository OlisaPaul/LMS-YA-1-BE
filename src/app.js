// Express make the server creation easier
const express = require("express");
const app = express();

require("./startup/routes.startup")(app);
require("./startup/database.startup")();
require("./startup/validation.startup")();

// intializes port with the PORT environment variable if it exists, if not it assigns 3000 to it
const port = process.env.PORT || 3000;

// Makes the server to listen to request on the assigned port.
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
