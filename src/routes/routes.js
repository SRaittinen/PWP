module.exports = app => {
    const event = require("../controllers/eventController.js");
    const time = require("../controllers/timeController.js");
    const competitor = require("../controllers/competitorController.js");

    //**    EVENTS       **//

    // Create a new event
    app.post("/api/event", event.create);

    // Retrieve all event
    app.get("/api/events", event.findAll);

    // // Retrieve a single event with eventId
    // app.get("/api/event/:eventId", event.findOne);

    // Retrieve a single event with eventName
    app.get("/api/event/:eventName", event.findOneName);

    // Update a event with eventName
    app.put("/api/event/:eventName", event.update);

    // Delete a event with eventId
    app.delete("/api/event/:eventName", event.delete);

    // Delete all events
    app.delete("/api/events", event.deleteAll);



    //**    COMPETITORS       **//

    // Create a new competitor
    app.post("/api/competitor", competitor.create);

    // Retrieve all competitors
    app.get("/api/competitors", competitor.findAll);

    // Retrieve a single competitor with competitorName
    app.get("/api/competitor/:competitorName", competitor.findOne);

    // Update a competitor with competitorName
    app.put("/api/competitor/:competitorName", competitor.update);

    // Delete a competitor with competitorName
    app.delete("/api/competitor/:competitorName", competitor.delete);

    // Delete all competitors
    app.delete("/api/competitors", competitor.deleteAll);




    //**    TIMES       **//

    // Add time to table
    app.post("/api/time", time.addTime);

    // Get the all times for specific event
    app.get("/api/times/event/:eventName", time.getTimes);

    // Get the all times event
    app.get("/api/times", time.getAll);

    // Get the times below the value given
    app.get("/api/times/below/:eventName/:limit", time.getBelow);

    // Get top x amount times of one event
    app.get("/api/times/top/:eventName/:amount", time.getTop);

    // Get times for certain competitor on certain event
    app.get("/api/time/competitor/event/:eventName/:competitorName", time.getCompetitorEventTimes);

    // Get all times for certain competitor on all events
    app.get("/api/times/competitor/:competitorName", time.getCompetitorTimes);

    // Update a time with timeId
    app.put("/api/time/:timeId", time.update);

    // Delete a timeId with timeId
    app.delete("/api/time/:timeId", time.delete);

    // Delete all times
    app.delete("/api/times", time.deleteAll);

};
