const Competitor = require("../models/competitorModel.js");

// Create and Save a new competitor
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a competitor
    const competitor = new Competitor({
      name: req.body.name,
      age: req.body.age
    });

    // Save event in the database
    Competitor.create(competitor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the competitor."
        });
      else res.send(data);
    });
};


// Retrieve all competitors from the database.
exports.findAll = (req, res) => {
    Competitor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving competitors."
        });
      else res.send(data);
    });
};

// Find a single Event with a competitorId
// exports.findOne = (req, res) => {
//     Competitor.findById(req.params.competitorId, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Event with id ${req.params.competitorId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error retrieving Event with id " + req.params.competitorId
//           });
//         }
//       } else res.send(data);
//     });
// };

// Find a single competitor with a competitorName
exports.findOne = (req, res) => {
    Competitor.findByName(req.params.competitorName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found competitor with name ${req.params.competitorName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving competitor with name " + req.params.competitorName
          });
        }
      } else res.send(data);
    });
};

// Update a competitor identified by the competitorId  in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    Competitor.updateById(
      req.params.competitorName,
      new Competitor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found competitor with name ${req.params.competitorName}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating competitor with name " + req.params.competitorName
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a competitor with the specified competitorId in the request
exports.delete = (req, res) => {
    Competitor.remove(req.params.competitorName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found competitor with name ${req.params.competitorName}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete competitor with name " + req.params.competitorName
          });
        }
      } else res.send({ message: `competitor ${req.params.competitorName} was deleted successfully!` });
    });
};

// Delete all competitors from the database.
exports.deleteAll = (req, res) => {
    Competitor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all competitors."
        });
      else res.send({ message: `All competitors were deleted successfully!` });
    });
};
