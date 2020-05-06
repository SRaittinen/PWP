const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configure app to user bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route TODO
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to PWP application." });
// });

require("./routes/routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// Export app for testing
module.exports = app;
