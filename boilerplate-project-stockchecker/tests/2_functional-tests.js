const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('GET /api/stock-prices', () => {
    let likes;
    let rel_likes;
    // #1
    test('Viewing one stock', done => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stockData');
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          assert.equal(res.body.stockData.stock, 'goog');
          done();
        })
    })
    // #2
    test('Viewing one stock and liking it', done => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stockData');
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isAbove(res.body.stockData.likes, 0);
          likes = res.body.stockData.likes;
          done();
        })
    })
    // #3
    test('Viewing the same stock and liking it again', done => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stockData');
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isAbove(res.body.stockData.likes, 0);
          assert.equal(res.body.stockData.likes, likes);
          done();
        })
    })
    // #4
    test('Viewing two stocks', done => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'msft']})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stockData');
          assert.isArray(res.body.stockData);
          assert.property(res.body.stockData[0], 'stock');
          assert.property(res.body.stockData[0], 'price');
          assert.property(res.body.stockData[0], 'rel_likes');
          assert.property(res.body.stockData[1], 'stock');
          assert.property(res.body.stockData[1], 'price');
          assert.property(res.body.stockData[1], 'rel_likes');
          assert.equal(res.body.stockData[0].stock, 'goog');
          assert.equal(res.body.stockData[1].stock, 'msft');
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);
          rel_likes = res.body.stockData[0].rel_likes;
          done();
        })
    })
    // #5
    test('Viewing two stocks and liking them', done => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'msft'], like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stockData');
          assert.isArray(res.body.stockData);
          assert.property(res.body.stockData[0], 'stock');
          assert.property(res.body.stockData[0], 'price');
          assert.property(res.body.stockData[0], 'rel_likes');
          assert.property(res.body.stockData[1], 'stock');
          assert.property(res.body.stockData[1], 'price');
          assert.property(res.body.stockData[1], 'rel_likes');
          assert.equal(res.body.stockData[0].stock, 'goog');
          assert.equal(res.body.stockData[1].stock, 'msft');
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);
          assert.equal(res.body.stockData[0].rel_likes, rel_likes);
          done();
        })
    })
  })
});
