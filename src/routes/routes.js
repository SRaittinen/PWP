module.exports = app => {
    const event = require("../controllers/event_controller.js");
    const time = require("../controllers/time_controller.js");
    const competitor = require("../controllers/competitor_controller.js");

    //**    EVENTS       **//

    // Create a new event
    app.post("/event", event.create);

    // Retrieve all event
    app.get("/event", event.findAll);

    // Retrieve a single event with eventId
    app.get("/event/:eventId", event.findOne);

    // Retrieve a single event with eventName
    app.get("/event/:eventName", event.findOneName);

    // Update a event with eventId
    app.put("/event/:eventId", event.update);

    // Delete a event with eventId
    app.delete("/event/:eventId", event.delete);

    // Delete all events
    app.delete("/event", event.deleteAll);




    //**    TIMES       **//
    //// TODO: nämä muokkaamatta

    // Start event that has been earlier created
    app.get("/event/:eventName/start", time.start);

    // Add time to table
    app.post("/event/:eventName/addTime", time.addTime);

    // Get the whole table
    app.get("/event/:eventName/getTimes", time.getTimes);

    // Get time or certain competitor
    app.get("/event/:eventName/getTime/:competitor", time.getTime);



    //**    COMPETITORS       **//

    // Create a new event
    app.post("/competitor", competitor.create);

    // Retrieve all event
    app.get("/competitor", competitor.findAll);

    // Retrieve a single event with eventId
    app.get("/competitor/:competitorId", competitor.findOne);

    // Retrieve a single event with eventName
    app.get("/competitor/:competitorName", competitor.findOneName);

    // Update a event with eventId
    app.put("/competitor/:competitorId", competitor.update);

    // Delete a event with eventId
    app.delete("/competitor/:competitorId", competitor.delete);

    // Delete all events
    app.delete("/competitor", competitor.deleteAll);
};
