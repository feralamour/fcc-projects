const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/solve', () => {
    //#1
    test('Solve with valid puzzle string', done => {
      let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let output = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: input
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'solution');
          assert.equal(res.body.solution, output);
          done();
        })
    })
    //#2
    test('Solve with missing puzzle string', done => {
      let error = { error: 'Required field missing' };

      chai.request(server)
        .post('/api/solve')
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        })
    })
    //#3
    test('Solve with invalid characters', done => {
      let input = '1.5..2.84..63.12.7.2..5...BAD.STR...8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let error = { error: 'Invalid characters in puzzle' };
      
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: input
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        })
    })
    //#4
    test('Solve with incorrect length', done => {
      let short = '1.5..2.84..63.12.7.2..5..9.3674.3.7.2..9.47...8..1..16..926914.37.';
      let long = '1.5..2.84..63.12.7.2..5...BAD.STR...8.2.3674.3.7.2..9.47...8..1..16....926914.37.....................';
      let error = { error: 'Expected puzzle to be 81 characters long' };

      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: short
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          
          chai.request(server)
          .post('/api/solve')
          .send({
            puzzle: long
          })
          .end((err, res) => {
            assert.isObject(res.body);
            assert.property(res.body, 'error');
            assert.deepEqual(res.body, error);
            done();
          })
        })
    })
    //#5
    test('Solve puzzle that cannot be solved', done => {
      let input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      let error = { error: 'Puzzle cannot be solved' };

      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: input
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        })
    })
  })
  suite('POST /api/check', () => {
    //#6
    test('Check w/ all fields valid', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'a1';
      let value = '7';
      let response = { valid: true };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#7
    test('Check w/ single conflict', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'a2';
      let value = '1';
      let response = { valid: false, conflict: [ 'row' ] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#8
    test('Check w/ multiple conflicts', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'a1';
      let value = '1';
      let response = { valid: false, conflict: [ 'row', 'column' ] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#9
    test('Check w/ all conflicts', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'a1';
      let value = '5';
      let response = { valid: false, conflict: [ 'row', 'column', 'region' ] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#10
    test('Check w/ missing required fields', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let response = { error: 'Required field(s) missing' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#11
    test('Check w/ invalid characters', done => {
      let input = '..9..5.1.85.4....2432..BAD.1...69.83.9.....6.62.71...9..STR.1945....4.37.4.3..6..';
      let coordinate = 'a1';
      let value = '7';
      let response = { error: 'Invalid characters in puzzle' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#12
    test('Check w/ incorrect length', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9';
      let coordinate = 'a1';
      let value = '7';
      let response = { error: 'Expected puzzle to be 81 characters long' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#13
    test('Check w/ invalid coordinate', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'z0';
      let value = '7';
      let response = { error: 'Invalid coordinate' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, response);
          done();
        })
    })
    //#14
    test('Check w/ invalid value', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'a1';
      let value = 'g';
      let response = { error: 'Invalid value' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: input, coordinate, value
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, response);
          done();
        })
    })
  })
});