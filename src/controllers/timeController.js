const Time = require("../models/timeModel.js");

// Create and Save a new competitor
exports.addTime = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can't be empty!"
      });
    }

    // Create a competitor
    const time = new Time({
        time: req.body.time,
        eventName: req.body.eventName,
        competitorName: req.body.competitorName
    });

    // Save event in the database
    Time.create(time, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the time."
        });
      else res.send(data);
    });
};


//Get all times of specific event
exports.getTimes = (req, res) => {
    Time.getTimes(req.params.eventName, (err, data) => {
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

// Retrieve all times from the database.
exports.getAll = (req, res) => {
    Time.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving times."
        });
      else res.send(data);
    });
};



//Get times below given value
exports.getBelow = (req, res) => {
    Time.getBelow(String(req.params.eventName), parseInt(req.params.limit), (err, data) => {
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

//Get top three times
exports.getTop = (req, res) => {
    Time.getTop(String(req.params.eventName), parseInt(req.params.amount), (err, data) => {
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

// Get times for certain competitor on certain event
exports.getCompetitorEventTimes = (req, res) => {
    Time.getCompetitorEventTimes(String(req.params.eventName),
                                String(req.params.competitorName), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
            `Not found Event/competitor with names ${req.params.eventName} and ${req.params.competitorName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Event/competitor with name "
                        + req.params.eventName + "/" + req.params.competitorName
          });
        }
      } else res.send(data);
    });
};

// Get all times for certain competitor on all events
exports.getCompetitorTimes = (req, res) => {
    Time.getCompetitorTimes(req.params.competitorName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found competitor with name ${req.params.competitorName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Event/competitor with name " + req.params.competitorName
          });
        }
      } else res.send(data);
    });
};

//Update time by id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
    }

    Time.update(req.params.timeId, new Time(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found time with id ${req.params.timeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating time with id " + req.params.timeId
                });
            }
        } else res.send(data);
    });
};

//Delete time by id
exports.delete = (req, res) => {
    Time.remove(req.params.timeId, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found time with id ${req.params.timeId}.`
            });
        } else {
            res.status(500).send({
              message: "Could not delete time with id " + req.params.timeId
            });
          }
        } else res.send({ message: `Time was deleted successfully!` });
    });
};

// Delete all times from the database.
exports.deleteAll = (req, res) => {
    Time.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all times."
        });
      else res.send({ message: `All times were deleted successfully!` });
    });
};
