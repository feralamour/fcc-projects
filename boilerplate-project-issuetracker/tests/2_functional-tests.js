const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let invalidId = '60890269d46ca8215d4f41aa'; // created while testing live demo
let testId = {_id: ''}; //for use with GET and PUT tests

suite('Functional Tests', function() {
  suite('POST /api/issues/apitest', () => {
    // #1
    test('All fields submitted', done => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Test 1',
          issue_text: 'All fields',
          created_by: 'Robo-Roxie',
          assigned_to: 'MochaChai',
          status_text: 'Testing'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Test 1');
          assert.equal(res.body.issue_text, 'All fields');
          assert.equal(res.body.created_by, 'Robo-Roxie');
          assert.equal(res.body.assigned_to, 'MochaChai');
          assert.equal(res.body.status_text, 'Testing');
          assert.isTrue(res.body.open);
          assert.isNumber(Date.parse(res.body.created_on));
          assert.isNumber(Date.parse(res.body.updated_on));
          assert.equal(res.body.created_on, res.body.updated_on);
          assert.property(res.body, '_id');
          done();
        })
    })
    // #2
    test('Required fields only', done => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Test 2',
          issue_text: 'Required fields only',
          created_by: 'Robo-Roxie'
        })
        .end((err, res) => {
          assert.equal(res.body.issue_title, 'Test 2');
          assert.equal(res.body.issue_text, 'Required fields only');
          assert.equal(res.body.created_by, 'Robo-Roxie');
          assert.isEmpty(res.body.assigned_to);
          assert.isEmpty(res.body.status_text);
          testId._id = res.body._id;
          done();
        })
    })
    // #3
    test('Missing required fields', done => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Missing Required Fields'
        })
        .end((err, res) => {
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        })
    })
  });
  suite('GET /api/issues/apitest', () => {
    // #4
    test('All issues', done => {
      chai
        .request(server)
        .get('/api/issues/apitest')
        .query({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], '_id');
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          done();
        })
    })
    // #5
    test('One param', done => {
      // Uses pre-created issue (testId) from earlier
      chai
        .request(server)
        .get('/api/issues/apitest?_id=' + testId._id)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0]._id, testId._id);
          done();
        })
    })
    // #6
    test('Multiple params', done => {
      // Uses pre-created issue (testId) from earlier
      chai
        .request(server)
        .get('/api/issues/apitest' + '?created_by=Robo-Roxie&assigned_to=MochaChai')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0].created_by, 'Robo-Roxie');
          assert.equal(res.body[0].assigned_to, 'MochaChai')
          done();
        })
    })
  });
  suite('PUT /api/issues/apitest', () => {
    //fcc test I'm failing
    test('fcc test I am failing (copied)', done => {
      async (getUserInput) => {
  try {
    let initialData = {
      issue_title: 'Issue to be Updated',
      issue_text: 'Functional Test - Put target',
      created_by: 'fCC'
    };
    const url = getUserInput('url') + '/api/issues/fcc-project';
    const itemToUpdate = await $.post(url, initialData);
    const updateSucccess = await $.ajax({
      url: url,
      type: 'PUT',
      data: { _id: itemToUpdate._id, issue_text: 'New Issue Text' }
    });
    assert.isObject(updateSucccess);
    assert.deepEqual(updateSucccess, {
      result: 'successfully updated',
      _id: itemToUpdate._id
    });
    const getUpdatedId = await $.get(url + '?_id=' + itemToUpdate._id);
    assert.isArray(getUpdatedId);
    assert.isObject(getUpdatedId[0]);
    assert.isAbove(
      Date.parse(getUpdatedId[0].updated_on),
      Date.parse(getUpdatedId[0].created_on)
    );
  } catch (err) {
    throw new Error(err.responseText || err.message);
  }
};
done();
    })

    // #7
    test('ID only', done => {
      // Uses pre-created ticket from Test #2 to update
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: testId._id
        })
        .end((err, res) => {
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.equal(res.body._id, testId._id)
          done();
        })
    })
    // #8
    test('ID plus update field', done => {
      // Uses pre-created ticket from Test #2 to update
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: testId._id,
          status_text: 'Pending'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            result: 'successfully updated',
            _id: testId._id
          });

          // Check it was updated
          chai
            .request(server)
            .get('/api/issues/apitest?_id=' + testId._id + '&status_text=Pending')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.property(res.body[0], 'status_text')
              assert.equal(res.body[0].status_text, 'Pending');
              assert.isAbove(
                Date.parse(res.body[0].updated_on),
                Date.parse(res.body[0].created_on)
              );
              done();
            })
        })
    })
    // #9
    test('ID plus update and close ticket', done => {
      // Uses previous update test
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: testId._id,
          status_text: 'In QA',
          open: 'false'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            result: 'successfully updated',
            _id: testId._id
          })
          
          // Check it was updated
          chai
            .request(server)
            .get('/api/issues/apitest?_id=' + testId._id + '&status_text=In%20QA&open=false')
            .send(testId)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.property(res.body[0], 'status_text')
              assert.property(res.body[0], 'open')
              assert.equal(res.body[0].open, false);
              assert.equal(res.body[0].status_text, 'In QA');
              done();
            })
        })
    })
    // #10
    test('ID missing', done => {
      // Empty PUT because ID missing
      chai
        .request(server)
        .put('/api/issues/apitest')
        .end((err, res) => {
          assert.equal(res.body.error, 'missing _id');
          done();
        })
    })
    // #11
    test('Any other error (e.g. invalid ID)', done => {
      // PUT with an invalid ID
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: invalidId,
          status_text: 'Pending'
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: 'could not update',
            _id: invalidId
          })
          done();
        })
    })
  });
  suite('DELETE /api/issues/apitest', () => {
    // #12
    test('Missing ID', done => {
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .end((req, res) => {
          assert.equal(res.body.error, 'missing _id')
          done();
        })
    })
    // #13
    test('Invalid ID', done => {
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .send({
          _id: invalidId
        })
        .end((req, res) => {
          assert.isObject(res.body);
          assert.equal(res.body.error, 'could not delete');
          assert.equal(res.body._id, invalidId);
          done();
        })
    })
    // #14
    test('Valid _id', done => {
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .send({
          _id: testId._id
        })
        .end((req, res) => {
          assert.isObject(res.body);
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, testId._id);
          done();
        })
    })
  });
  //*/
});