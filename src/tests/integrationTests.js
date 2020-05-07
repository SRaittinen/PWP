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
    console.log("transaction");
    sql.query('BEGIN');
    done();
});

afterEach(function(done){
    console.log("rolbak");
    sql.query('ROLLBACK');
    done();
});

describe("Events", () => {

    describe("/api/event", () => {
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
            .send(data.event1)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('address');
              res.body.should.have.property('date');
              res.body.name.should.equal(data.event1.name);
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


    describe("/api/events", () => {
        // Test to get all events
        it("should GET all events on /api/events", (done) => {
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
         it("should DELETE all events on /api/events", (done) => {
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

//
// describe("Competitors", () => {
//     describe("GET /api/events", () => {
//         // Test to get all events record
//         it("should get all events", (done) => {
//              chai.request(app)
//                  .get('/api/events')
//                  .end((err, res) => {
//                      res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      done();
//                   });
//          });
//     });
// });
//
//
// describe("Times", () => {
//     describe("GET /api/events", () => {
//         // Test to get all events record
//         it("should get all events", (done) => {
//              chai.request(app)
//                  .get('/api/events')
//                  .end((err, res) => {
//                      res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      done();
//                   });
//          });
//     });
// });
