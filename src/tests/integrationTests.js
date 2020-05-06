// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

//chai
chai.use(chaiHttp);
chai.should();

//Get the structure of database json
const data = require('./testDBStructure.json')


describe("Events", () => {
    describe("/api/events", () => {
        // Test to get all events record
        it("should get all events", (done) => {
             chai.request(app)
                 .get('/api/events')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single event
        it("should get a single event", (done) => {
             const name = data.event1.name;
             chai.request(app)
                 .get(`/api/event/${name}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get single event
        it("should not get a single event", (done) => {
             const name = "asdasdasd";
             chai.request(app)
                 .get(`/api/event/${name}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});


describe("Competitors", () => {
    describe("GET /api/events", () => {
        // Test to get all events record
        it("should get all events", (done) => {
             chai.request(app)
                 .get('/api/events')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});


describe("Times", () => {
    describe("GET /api/events", () => {
        // Test to get all events record
        it("should get all events", (done) => {
             chai.request(app)
                 .get('/api/events')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});
