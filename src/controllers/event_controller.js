const Event = require("../models/event_model.js");

// Create and Save a new Event
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a event
    const event = new Event({
      name: req.body.name,
      address: req.body.address,
      date: req.body.date
    });

    // Save event in the database
    Event.create(event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
};


// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    Event.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
      else res.send(data);
    });
};

// Find a single Event with a eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.eventId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Event with id " + req.params.eventId
          });
        }
      } else res.send(data);
    });
};

// Find a single Event with a eventName
exports.findOneName = (req, res) => {
    Event.findByName(req.params.eventName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with name ${req.params.eventName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Event with name " + req.params.eventName
          });
        }
      } else res.send(data);
    });
};

// Update a Event identified by the eventId  in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    Event.updateById(
      req.params.eventId,
      new Event(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Event with id ${req.params.eventId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Event with id " + req.params.eventId
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a Event with the specified eventId in the request
exports.delete = (req, res) => {
    Event.remove(req.params.eventId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.eventId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Event with id " + req.params.eventId
          });
        }
      } else res.send({ message: `Event was deleted successfully!` });
    });
};

// Delete all Event from the database.
exports.deleteAll = (req, res) => {
    Event.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all events."
        });
      else res.send({ message: `All Events were deleted successfully!` });
    });
};
