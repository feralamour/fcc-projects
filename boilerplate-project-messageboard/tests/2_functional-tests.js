const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('POST /api/threads/{board}', () => {
    //#1
    test('Creating a new thread', done => {
      chai.request(server)
        .post('/api/threads/test')
        .send({
          text: 'New Thread',
          delete_password: 'password'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        })
    })
  })
  suite('GET /api/threads/{board}', () => {
    //#2
    test('Viewing the 10 most recent threads with 3 replies each', done => {
      chai.request(server)
        .get('/api/threads/test')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isBelow(res.body.length, 11);
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'board');
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'bumped_on');
          assert.property(res.body[0], 'replies');
          assert.isArray(res.body[0].replies);
          assert.isBelow(res.body[0].replies.length, 4);
          test_id = res.body[0]._id;
          done();
        })
    })
  })
  suite('POST /api/replies/{board}', () => {
    //#3
    test('Creating a new reply', done => {
      chai.request(server)
        .post('/api/replies/test')
        .send({
          thread_id: test_id,
          text: 'Test Reply',
          delete_password: 'password'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        })
    })
  })
  suite('GET /api/replies/{board}', () => {
    //#4
    test('Viewing a single thread with all replies', done => {
      chai.request(server)
        .get('/api/replies/test')
        .query({
          thread_id: test_id
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'bumped_on');
          assert.property(res.body, 'replies');
          assert.isArray(res.body.replies);
          assert.equal(res.body.replies[0].text, 'Test Reply');
          testreply_id = res.body.replies[0]._id;
          done();
        })
    })
  })
  suite('PUT /api/replies/{board}', () => {
    //#5
    test('Reporting a reply', done => {
      chai.request(server)
        .put('/api/replies/test')
        .send({
          thread_id: test_id,
          reply_id: testreply_id
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
    })
  })
  suite('DELETE /api/replies/{board}', () => {
    //#6
    test('Deleting a reply with an incorrect password', done => {
      chai.request(server)
        .delete('/api/replies/test')
        .send({
          thread_id: test_id,
          reply_id: testreply_id,
          delete_password: 'badpass'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        })
    })
    //#7
    test('Deleting a reply with the correct password', done => {
      chai.request(server)
        .delete('/api/replies/test')
        .send({
          thread_id: test_id,
          reply_id: testreply_id,
          delete_password: 'password'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
    })
  })
  suite('PUT /api/threads/{board}', () => {
    //#8
    test('Reporting a thread', done => {
      chai.request(server)
        .put('/api/threads/test')
        .send({
          report_id: test_id
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
    })
  })
  suite('DELETE /api/threads/{board}', () => {
    //#9
    test('Deleting a thread with an incorrect password', done => {
      chai.request(server)
        .delete('/api/threads/test')
        .send({
          thread_id: test_id,
          delete_password: 'badpass'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        })
    })
    //#10
    test('Deleting a thread with the correct password', done => {
      chai.request(server)
        .delete('/api/threads/test')
        .send({
          thread_id: test_id,
          delete_password: 'password'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
    })
  })
});
