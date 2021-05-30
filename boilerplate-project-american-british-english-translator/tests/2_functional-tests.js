const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  suite('POST /api/translate', () => {
    //#1
    test('Translation with text and locale fields', done => {
      chai.request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.property(res.body, 'text');
          assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
          assert.property(res.body, 'translation');
          assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
          done();
        })
    })
    //#2
    test('Translation with text and invalid locale field', done => {
      chai.request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'english-to-spanish'
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid value for locale field');
          done();
        })
    })
    //#3
    test('Translation with missing text field', done => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        })
    })
    //#4
    test('Translation with missing locale field', done => {      
      chai.request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.'
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        })
    })
    //#5
    test('Translation with empty text', done => {
      chai.request(server)
        .post('/api/translate')
        .send({
          text: '',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'No text to translate');
          done();
        })
    })
    //#6
    test('Translation with text that needs no translation', done => {      
      chai.request(server)
        .post('/api/translate')
        .send({
          text: 'Hello world!',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.property(res.body, 'text');
          assert.equal(res.body.text, 'Hello world!');
          assert.property(res.body, 'translation');
          assert.equal(res.body.translation, 'Everything looks good to me!');
          done();
        })
    })
  })
});
