const sql = require("./db.js");

// constructor
const Time = function(time) {
    this.competitor = time.competitor;
    this.age = time.age;
    this.time = time.time;
};

//Add event to events table and create own table for event
Time.start = (raceName, result) => {
    sql.query("CREATE TABLE " + raceName + " (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, competitor varchar(255) NOT NULL, age int(11) NOT NULL, time varchar(255) NOT NULL)",
                (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    console.log("created table: " + raceName);
    result(null, raceName);
    });
};

//Add new time to a table
Time.addTime = (newRace, raceName, result) => {
    sql.query("INSERT INTO " + raceName + " SET ?", newRace, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }


      console.log("created event: ", { id: res.insertId, ...newRace });
      result(null, { id: res.insertId, ...newRace });
    });
};

//Return whole table
Time.getAll = (raceName, result) => {
  sql.query("SELECT * FROM " + raceName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("events: ", res);
    result(null, res);
  });
};


//Find all times of one competitor
Time.getOne = (raceName, competitor, result) => {
  sql.query("SELECT * FROM " + raceName + " WHERE competitor = ?", competitor, (err, res) => {
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

    // not found event with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Time;
