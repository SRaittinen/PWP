const Race = require("../models/race_model.js");
const Event = require("../models/event_model.js");

// Find a single Event with a eventId
exports.start = (req, res) => {
    //Get race data
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
      }

      Race.start(data.name.replace(/\'/g,''), (err, data) => {
        if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the event."
              });
        else res.send(data);
      });
    });

};


// Create and Save a new race time
exports.addTime = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const race = new Race({
      competitor: req.body.competitor,
      age: req.body.age,
      time: req.body.time
    });

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
      }

    // Save time
    Race.addTime(race, data.name.replace(/\'/g,''), (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the time."
        });
      else res.send(data);
    });
    });
};


// Retrieve all info from the database.
exports.getTimes = (req, res) => {
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
      }

    Race.getAll(data.name.replace(/\'/g,''), (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving times."
        });
      else res.send(data);
    });
    });
};

// Find a single Event with a eventId
exports.getTime = (req, res) => {
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
      }

      Race.getOne(data.name.replace(/\'/g,''), req.params.competitor, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found competitor with name ${req.params.competitor}.`
              });
        } else {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving competitor."
          });
        }
      }
      else res.send(data);
    });
    });
};
