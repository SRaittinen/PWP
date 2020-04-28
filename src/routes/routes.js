module.exports = app => {
    const event = require("../controllers/event_controller.js");
    const time = require("../controllers/time_controller.js");
    const competitor = require("../controllers/competitor_controller.js");

    //**    EVENTS       **//

    // Create a new event
    app.post("/api/event", event.create);

    // Retrieve all event
    app.get("/api/event", event.findAll);

    // // Retrieve a single event with eventId
    // app.get("/api/event/:eventId", event.findOne);

    // Retrieve a single event with eventName
    app.get("/api/event/:eventName", event.findOneName);

    // Update a event with eventName
    app.put("/api/event/:eventName", event.update);

    // Delete a event with eventId
    app.delete("/api/event/:eventName", event.delete);

    // Delete all events
    app.delete("/api/event", event.deleteAll);




    //**    TIMES       **//

    // Add time to table
    app.post("/api/time", time.addTime);

    // Get the all times for specific event
    app.get("/api/time/event/:eventName", time.getTimes);

    // Get the all times for specific event
    app.get("/api/time", time.getAll);

    // Get the times below the value given f
    app.get("/api/time/below/:eventName/:limit", time.getBelow);

    // Get top three times of one event
    app.get("/api/time/top/:eventName/:amount", time.getTop);

    // Get times for certain competitor on certain event
    app.get("/api/time/competitor/event/:eventName/:competitorName", time.getCompetitorEventTimes);

    // Get all times for certain competitor on all events
    app.get("/api/time/competitor/:competitorName", time.getCompetitorTimes);

    // Delete all times
    app.delete("/api/time", time.deleteAll);



    //**    COMPETITORS       **//

    // Create a new event
    app.post("/api/competitor", competitor.create);

    // Retrieve all event
    app.get("/api/competitor", competitor.findAll);

    // Retrieve a single event with eventName
    app.get("/api/competitor/:competitorName", competitor.findOne);

    // Update a event with eventId
    app.put("/api/competitor/:competitorName", competitor.update);

    // Delete a event with eventId
    app.delete("/api/competitor/:competitorName", competitor.delete);

    // Delete all events
    app.delete("/api/competitor", competitor.deleteAll);
};
