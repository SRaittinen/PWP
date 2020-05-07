// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const sql = require("../models/db.js");

//chai
chai.use(chaiHttp);
chai.should();

//Get the structure of database json
const data = require('./testDBStructure.json')

//Set up the database structure before testing
before(function(done){
    console.log('Init database...');
    sql.query("INSERT INTO events SET ?", data.event1);
    sql.query("INSERT INTO events SET ?", data.event2);
    sql.query("INSERT INTO events SET ?", data.event3);
    sql.query("INSERT INTO competitors SET ?", data.competitor1);
    sql.query("INSERT INTO competitors SET ?", data.competitor2);
    sql.query("INSERT INTO competitors SET ?", data.competitor3);
    sql.query("INSERT INTO times SET ?", data.time1);
    sql.query("INSERT INTO times SET ?", data.time2);
    sql.query("INSERT INTO times SET ?", data.time3);
    console.log('Init database done!');
    done();
});

//Rollback to earlier state of testDB after each test
beforeEach(function(done){
    sql.query('BEGIN');
    done();
});

afterEach(function(done){
    sql.query('ROLLBACK');
    done();
});

// TODO: posteihin jos väärä runko, asdasdit muuttujiin
//** EVENTS **//

describe("Events", () => {
    describe("/api/event/", () => {
        // Test to post single event
        it('should POST a single event', (done) => {
          chai.request(app)
            .post('/api/event/')
            .send(data.newEvent)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('eventId');
              res.body.should.have.property('name');
              res.body.should.have.property('address');
              res.body.should.have.property('date');
              res.body.name.should.equal(data.newEvent.name);
              done();
              });
        });

        //Test to not post single event
        it('should not POST a single event (500)', (done) => {
          chai.request(app)
            .post('/api/event/')
            .send(data.event1)
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
              });
        });

        //Test to not post single event
        it('should not POST a single event (500)', (done) => {
          chai.request(app)
            .post('/api/event/')
            .send({asd: "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
              });
        });

        // Test to get single event
        it("should GET a single event", (done) => {
             const name = data.event1.name;
             chai.request(app)
                 .get(`/api/event/${name}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('name');
                     res.body.should.have.property('eventId');
                     res.body.should.have.property('address');
                     res.body.should.have.property('date');
                     res.body.name.should.equal(data.event1.name);
                     done();
                  });
             });

         // Test to not get single event
         it("should not GET a single event (404)", (done) => {
            const name = "asdasdasd";
            chai.request(app)
              .get(`/api/event/${name}`)
              .end((err, res) => {
                  res.should.have.status(404);
                  done();
               });
          });

        // Test to update single event
        it('should update (PUT) a single event', (done) => {
          chai.request(app)
            .put('/api/event/' + data.event1.name)
            .send(data.newEvent)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('address');
              res.body.should.have.property('date');
              res.body.name.should.equal(data.newEvent.name);
              done();
              });
        });

        // Test not to update single event
        it('should not update (PUT) a single event (404)', (done) => {
          chai.request(app)
            .put('/api/event/asdasd')
            .send(data.event1)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Not found Event with name asdasd.');
              done();
              });
        });

        // Test not to update single event
        it('should not update (PUT) a single event (500)', (done) => {
          chai.request(app)
            .put('/api/event/' + data.event1.name)
            .send({"asd": "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Error updating Event with name ' + data.event1.name);
              done();
              });
        });

        //Test to delete single event
        it("should DELETE a single event", (done) => {
             chai.request(app)
                 .delete('/api/event/' + data.event1.name)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('message');
                     res.body.message.should.equal('Event was deleted successfully!');
                     done();
                  });
         });

         //Test not to delete single event
         it("should not DELETE a single event (404)", (done) => {
              chai.request(app)
                  .delete('/api/event/asdasdasd')
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal('Not found Event with name asdasdasd.');
                      done();
                   });
          });

    });


    describe("/api/events/", () => {
        // Test to get all events
        it("should GET all events", (done) => {
             chai.request(app)
                 .get('/api/events')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('eventId');
                     res.body[0].should.have.property('name');
                     res.body[0].should.have.property('address');
                     res.body[0].should.have.property('date');
                     res.body[0].name.should.equal(data.event1.name);
                     done();
                  });
         });

         //Test to delete all events
         it("should DELETE all events", (done) => {
              chai.request(app)
                  .delete('/api/events')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("All Events were deleted successfully!");
                      done();
                   });
          });
     });
});



//** COMPETITORS **//

describe("Competitors", () => {
    describe("/api/competitor/", () => {
        // Test to post single competitor
        it('should POST a single competitor', (done) => {
          chai.request(app)
            .post('/api/competitor/')
            .send(data.newCompetitor)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('competitorId');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.name.should.equal(data.newCompetitor.name);
              done();
              });
        });

        //Test to not post single competitor
        it('should not POST a single competitor (500)', (done) => {
          chai.request(app)
            .post('/api/competitor/')
            .send(data.competitor1)
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
              });
        });

        //Test to not post single competitor
        it('should not POST a single competitor (500)', (done) => {
          chai.request(app)
            .post('/api/competitor/')
            .send({asd: "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
              });
        });

        // Test to get single competitor
        it("should GET a single competitor", (done) => {
             chai.request(app)
                 .get(`/api/competitor/${data.competitor1.name}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('competitorId');
                     res.body.should.have.property('name');
                     res.body.should.have.property('age');
                     res.body.name.should.equal(data.competitor1.name);
                     done();
                  });
             });

         // Test to not get single competitor
         it("should not GET a single competitor (404)", (done) => {
            const name = "asdasdasd";
            chai.request(app)
              .get(`/api/competitor/${name}`)
              .end((err, res) => {
                  res.should.have.status(404);
                  done();
               });
          });

        // Test to update single competitor
        it('should update (PUT) a single competitor', (done) => {
          chai.request(app)
            .put('/api/competitor/' + data.competitor1.name)
            .send(data.newCompetitor)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.name.should.equal(data.newCompetitor.name);
              done();
              });
        });

        // Test not to update single competitor
        it('should not update (PUT) a single competitor (404)', (done) => {
          chai.request(app)
            .put('/api/competitor/asdasd')
            .send(data.competitor1)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Not found competitor with name asdasd.');
              done();
              });
        });

        // Test not to update single competitor
        it('should not update (PUT) a single competitor (500)', (done) => {
          chai.request(app)
            .put('/api/competitor/' + data.competitor1.name)
            .send({"asd": "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Error updating competitor with name ' +
                                            data.competitor1.name);
              done();
              });
        });

        //Test to delete single competitor
        it("should DELETE a single competitor", (done) => {
             chai.request(app)
                 .delete('/api/competitor/' + data.competitor1.name)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('message');
                     res.body.message.should.equal('competitor ' +
                                                    data.competitor1.name +
                                                    ' was deleted successfully!');
                     done();
                  });
         });

         //Test not to delete single competitor
         it("should not DELETE a single competitor (404)", (done) => {
              chai.request(app)
                  .delete('/api/competitor/asdasdasd')
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal('Not found competitor with name asdasdasd.');
                      done();
                   });
          });
    });

    describe("/api/competitors/", () => {
        // Test to get all competitors
        it("should GET all competitors", (done) => {
             chai.request(app)
                 .get('/api/competitors')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('competitorId');
                     res.body[0].should.have.property('name');
                     res.body[0].should.have.property('age');
                     res.body[0].name.should.equal(data.competitor1.name);
                     done();
                  });
         });

         //Test to delete all competitors
         it("should DELETE all competitors", (done) => {
              chai.request(app)
                  .delete('/api/competitors')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("All competitors were deleted successfully!");
                      done();
                   });
          });
    });
});



//** TIMES **//

describe("Times", () => {
    describe("/api/time/", () => {

        // Test to post single time
        it('should POST a single time', (done) => {
          chai.request(app)
            .post('/api/time/')
            .send(data.newTime)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('timeId');
              res.body.should.have.property('time');
              res.body.should.have.property('eventName');
              res.body.should.have.property('competitorName');
              res.body.time.should.equal(data.newTime.time);
              done();
              });
        });

        //Test to not post single time
        it('should not POST a single time (500)', (done) => {
          chai.request(app)
            .post('/api/time/')
            .send({asd: "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
              });
        });

        // Test to update single time
        it('should update (PUT) a single time', (done) => {
          chai.request(app)
            .put('/api/time/1')
            .send(data.newTime)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('timeId');
              res.body.should.have.property('time');
              res.body.should.have.property('eventName');
              res.body.should.have.property('competitorName');
              res.body.time.should.equal(data.newTime.time);
              done();
              });
        });

        // Test not to update single time
        it('should not update (PUT) a single time (404)', (done) => {
          chai.request(app)
            .put('/api/time/asdasd')
            .send(data.time1)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Not found time with id asdasd.');
              done();
              });
        });

        // Test not to update single time
        it('should not update (PUT) a single time (500)', (done) => {
          chai.request(app)
            .put('/api/time/1')
            .send({"asd": "asd"})
            .end((err, res) => {
              res.should.have.status(500);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.equal('Error updating time with id 1');
              done();
              });
        });

        //Test to delete single time
        it("should DELETE a single time", (done) => {
             chai.request(app)
                 .delete('/api/time/1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('message');
                     res.body.message.should.equal('Time was deleted successfully!');
                     done();
                  });
         });

         //Test not to delete single time
         it("should not DELETE a single time (404)", (done) => {
              chai.request(app)
                  .delete('/api/time/asdasdasd')
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal('Not found time with id asdasdasd.');
                      done();
                   });
          });
    });

    describe("/api/times/", () => {

        // Test to get all times
        it("should GET all times", (done) => {
             chai.request(app)
                 .get('/api/times')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         //Test to delete all times
         it("should DELETE all times", (done) => {
              chai.request(app)
                  .delete('/api/times')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("All times were deleted successfully!");
                      done();
                   });
          });
    });


    describe("/api/times/event/", () => {

        // Test to get all times
        it("should GET all event times", (done) => {
             chai.request(app)
                 .get('/api/times/event/' + data.event1.name)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         // Test to not to get all times
         it("should not GET all event times (404)", (done) => {
              const name = "asd";
              chai.request(app)
                  .get('/api/times/event/' + name)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("Not found Event with name " +
                                                    name + ".");
                      done();
                   });
          });
    });


    describe("/api/times/below/", () => {

        // Test to get all times below
        it("should GET all event times below", (done) => {
             const value = 22.23;
             chai.request(app)
                 .get('/api/times/below/' + data.event1.name + "/" + value)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         // Test to not to get all times below
         it("should not GET all event times below (404)", (done) => {
              const value = 22.23;
              const name = "asd";
              chai.request(app)
                  .get('/api/times/below/' + name + "/" + value)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("Not found Event with name " +
                                                    name + ".");
                      done();
                   });
          });

          // Test to not to get all times below
          it("should not GET all event times below (500)", (done) => {
               const value = "asd";
               chai.request(app)
                   .get('/api/times/below/' + data.event1.name + "/" + value)
                   .end((err, res) => {
                       res.should.have.status(500);
                       res.body.should.be.a('object');
                       res.body.should.have.property('message');
                       res.body.message.should.equal("Error retrieving Event with name " +
                                                     data.event1.name);
                       done();
                    });
           });
    });


    describe("/api/times/top/", () => {

        // Test to get all times top
        it("should GET top event times", (done) => {
             const value = 2;
             chai.request(app)
                 .get('/api/times/top/' + data.event1.name + "/" + value)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         // Test to not to get all times top
         it("should not GET top event times (404)", (done) => {
              const value = 22.23;
              const name = "asd";
              chai.request(app)
                  .get('/api/times/top/' + name + "/" + value)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("Not found Event with name " +
                                                    name + ".");
                      done();
                   });
          });

          // Test to not to get all times top
          it("should not GET top event times (500)", (done) => {
               const value = "asd";
               chai.request(app)
                   .get('/api/times/top/' + data.event1.name + "/" + value)
                   .end((err, res) => {
                       res.should.have.status(500);
                       res.body.should.be.a('object');
                       res.body.should.have.property('message');
                       res.body.message.should.equal("Error retrieving Event with name " +
                                                     data.event1.name);
                       done();
                    });
           });
    });


    describe("/api/time/competitor/event/", () => {

        // Test to get all competitor event times top
        it("should GET all competitor event times", (done) => {
             chai.request(app)
                 .get('/api/time/competitor/event/' + data.time1.eventName +
                        "/" + data.time1.competitorName)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         // Test to not to get all times top
         it("should not GET all competitor event times (404)", (done) => {
              const name = "asd";
              chai.request(app)
                  .get('/api/time/competitor/event/' + name +
                         "/" + data.time1.competitorName)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("Not found Event/competitor with names " +
                                                    name + " and " + data.time1.competitorName
                                                    + ".");
                      done();
                   });
          });
    });

    describe("/api/times/competitor/", () => {

        // Test to get all competitor event times top
        it("should GET all competitor times", (done) => {
             chai.request(app)
                 .get('/api/times/competitor/' + data.time1.competitorName)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     res.body[0].should.have.property('timeId');
                     res.body[0].should.have.property('time');
                     res.body[0].should.have.property('eventName');
                     res.body[0].should.have.property('competitorName');
                     res.body[0].time.should.equal(data.time1.time);
                     done();
                  });
         });

         // Test to not to get all times top
         it("should not GET all competitor event 404)", (done) => {
              const name = "asd";
              chai.request(app)
                  .get('/api/times/competitor/' + name)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      res.body.message.should.equal("Not found competitor with name " +
                                                    name + ".");
                      done();
                   });
          });
    });
});
