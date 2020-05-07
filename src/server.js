const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config.js");

const app = express();

//Dont print out console log on tests
require("log-suppress").init(console, 'test');

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/routes.js")(app);

// set port, listen for requests
app.listen(config.port[process.env.NODE_ENV], () => {
  console.log("Server is running on port " + config.port[process.env.NODE_ENV]);
});

// Export app for testing
module.exports = app;
