const GetData = require('../controllers/stockHandler.js');

'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let stock = req.query.stock;
      let liked = req.query.like;
      let ip = req.headers['x-forwarded-for'] || req.ip;

      if (!Array.isArray(stock)) {
        stock = [stock];
      }

      let stockData = await GetData(stock, liked, ip)

      if (stockData[0].price === undefined) {
        return res.json({
          "stockData": {"error":"external source error","likes":0}
        })
      } else if (stock.length > 1) {
        let rel_1 = {"rel_likes": stockData[0].likes - stockData[1].likes};
        let rel_2 = {"rel_likes": stockData[1].likes - stockData[0].likes};

        stockData[0] = {...stockData[0], ...rel_1}
        delete stockData[0].likes;
        stockData[1] = {...stockData[1], ...rel_2}
        delete stockData[1].likes;

        return res.json({
          "stockData": stockData
        })
      } else {
        return res.json({
          "stockData": stockData[0]
        })
      }
      
    });
};
