const sql = require("./db.js");

// constructor
const Competitor = function(competitor) {
  this.name = competitor.name;
  this.age = competitor.age;
};

//Add competitor to competitors table
Competitor.create = (newCompetitor, result) => {
  sql.query("INSERT INTO competitors SET ?", newCompetitor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    console.log("created competitor: ", { id: res.insertId, ...newCompetitor });
    result(null, { id: res.insertId, ...newCompetitor });
  });
};

// Competitor.findById = (competitorId, result) => {
//   sql.query(`SELECT * FROM competitors WHERE competitorId = ${competitorId}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//
//     if (res.length) {
//       console.log("found event: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//
//     // not found competitor with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Competitor.findByName = (competitorName, result) => {
  sql.query(`SELECT * FROM competitors WHERE name = ?`, competitorName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found competitor with the name
    result({ kind: "not_found" }, null);
  });
};

Competitor.getAll = result => {
  sql.query("SELECT * FROM competitors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("competitors: ", res);
    result(null, res);
  });
};

Competitor.updateById = (name, competitor, result) => {
  sql.query("UPDATE competitors SET name = ?, age = ? WHERE name = ?",
    [competitor.name, competitor.age, name],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found competitor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated competitor: ", { name: name, ...competitor });
      result(null, { name: name, ...competitor });
    }
  );
};

Competitor.remove = (name, result) => {
  sql.query("DELETE FROM competitors WHERE name = ?", name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found competitor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted competitors with name: ", name);
    result(null, res);
  });
};

Competitor.removeAll = result => {
  sql.query("DELETE FROM competitors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} competitor`);
    result(null, res);
  });
};

module.exports = Competitor;
