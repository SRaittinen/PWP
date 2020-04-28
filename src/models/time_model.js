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


    console.log("created time: ", { id: res.insertId, ...newTime });
    result(null, { id: res.insertId, ...newTime });
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
      result(null, err);
      return;
    }

    console.log("times: ", res);
    result(null, res);
  });
};


Time.getBelow = (eventName, limit, result) => {
  sql.query(`SELECT * FROM times WHERE eventName = ? AND time <= ? ORDER BY time DESC`,
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

Time.removeAll = result => {
  sql.query("DELETE FROM times", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} times`);
    result(null, res);
  });
};

module.exports = Time;
