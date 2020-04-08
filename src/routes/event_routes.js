module.exports = app => {
    const event = require("../controllers/event_controller.js");

    // Create a new event
    app.post("/event", event.create);

    // Retrieve all event
    app.get("/event", event.findAll);

    // Retrieve a single event with eventId
    // TODO: muuta nämä nimelle eikä id:lle
    //app.get("/event/:eventId", event.findOne);

    // Retrieve a single event with eventName
    app.get("/event/:eventName", event.findOneName);

    // Update a event with eventId
    app.put("/event/:eventId", event.update);

    // Delete a event with eventId
    app.delete("/event/:eventId", event.delete);

    // Delete all events
    app.delete("/event", event.deleteAll);

};
