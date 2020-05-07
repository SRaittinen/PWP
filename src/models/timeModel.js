const sql = require("./db.js");

// constructor
const Time = function(time) {
    this.time = time.time;
    this.eventName = time.eventName;
    this.competitorName = time.competitorName;
};

//Add event to events table and create own table for event
Time.create = (newTime, result) => {
  sql.query("INSERT INTO times SET ?", newTime, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    console.log("created time: ", { timeId: res.insertId, ...newTime });
    result(null, { timeId: res.insertId, ...newTime });
  });
};

Time.getTimes = (eventName, result) => {
  sql.query(`SELECT * FROM times WHERE eventName = ?`, eventName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found times: ", res);
      result(null, res);
      return;
    }

    // not found event with the id
    result({ kind: "not_found" }, null);
  });
};

Time.getAll = result => {
  sql.query("SELECT * FROM times", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("times: ", res);
    result(null, res);
  });
};


Time.getBelow = (eventName, limit, result) => {
  sql.query(`SELECT * FROM times WHERE eventName = ? AND time <= ? ORDER BY time ASC`,
      [eventName, limit], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found times: ", res);
      result(null, res);
      return;
    }

    // not found event with the id
    result({ kind: "not_found" }, null);
  });
};


Time.getTop = (eventName, amount, result) => {
    sql.query(`SELECT * FROM times WHERE eventName = ? ORDER BY time ASC limit ?`,
      [eventName, amount], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found times: ", res);
      result(null, res);
      return;
    }

    // not found event with the id
    result({ kind: "not_found" }, null);
    });
};

Time.getCompetitorEventTimes = (eventName, competitorName, result) => {
  sql.query(`SELECT * FROM times WHERE eventName = ? AND competitorName = ?`,
            [eventName, competitorName], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found times: ", res);
      result(null, res);
      return;
    }

    // not found event with the id
    result({ kind: "not_found" }, null);
  });
};

Time.getCompetitorTimes = (competitorName, result) => {
  sql.query(`SELECT * FROM times WHERE competitorName = ?`,
            competitorName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found times: ", res);
      result(null, res);
      return;
    }

    // not found time with the id
    result({ kind: "not_found" }, null);
  });
};


Time.update = (id, time, result) => {
  sql.query(
    "UPDATE times SET time = ?, eventName = ?, competitorName = ? WHERE timeId = ?",
    [time.time, time.eventName, time.competitorName, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found time with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated time: ", { timeId: id, ...time });
      result(null, { timeId: id, ...time });
    }
  );
};

Time.remove = (id, result) => {
  sql.query("DELETE FROM times WHERE timeId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found time with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted time with id: ", id);
    result(null, res);
  });
};

Time.removeAll = result => {
  sql.query("DELETE FROM times", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} times`);
    result(null, res);
  });
};

module.exports = Time;
