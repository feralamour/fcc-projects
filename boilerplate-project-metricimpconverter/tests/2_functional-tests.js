const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('GET request to /api/convert', () => {
    // #1
    test('Convert valid input: 10L', done => {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    })
    // #2
    test('Convert invalid input: 32g', done => {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function (err, res) {
          assert.equal(res.body, 'invalid unit');
          done();
        });
    })
    // #3
    test('Convert invalid number: 3/7.2/4kg', done => {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function (err, res) {
          assert.equal(res.body, 'invalid number');
          done();
        });
    })
    // #4
    test('Convert invalid number and unit: 3/7.2/4kilomegagram', done => {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function (err, res) {
          assert.equal(res.body, 'invalid number and unit');
          done();
        });
    })
    // #5
    test('Convert with no number: kg', done => {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });
  });
});
