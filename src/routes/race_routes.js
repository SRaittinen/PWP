module.exports = app => {
  const race = require("../controllers/race_controller.js");


  // Start event that has been earlier created
  app.get("/event/:eventName/start", race.start);

  // Add time to table
  app.post("/event/:eventName/addTime", race.addTime);

  // Get the whole table
  app.get("/event/:eventName/getTimes", race.getTimes);

  // Get time or certain competitor
  app.get("/event/:eventName/getTime/:competitor", race.getTime);
};
