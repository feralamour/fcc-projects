const fetch = require('node-fetch');
const Stock = require('../models/stock.js');

const GetData = async (stock, liked, ip) => {
  let results = await Promise.all(stock.map(async (stock) => {
    let price = await GetPrice(stock.toLowerCase())
    await CheckDoc(stock.toLowerCase())
    await CheckIP(stock.toLowerCase(), liked, ip)
    let likes = await GetLikes(stock.toLowerCase(), liked, ip)

    let stockData = {
      "stock": stock.toLowerCase(),
      "price": price,
      "likes": likes
    }
    return stockData;
  }))
  return results
}

const CheckDoc = async (stock) => {
  let check = await Stock.findOne({"stock": stock})
  .then(doc => { return doc })

  if (!check || check === null) {
    let newDoc = Promise.resolve(Stock.create({ "stock": stock }))
    .then(doc => { return doc })
    
    return newDoc;
    }

    return check;
}

const CheckIP = async (stock, liked, ip) => {
  let findIP = await Promise.resolve(Stock.findOne({"stock": stock}, {"ips": {$in: [ip, "$ips"]}}))
  .then(doc => {return doc})
  
  if (liked === 'true' && findIP.ips[0] === 'false') {
    let update = Promise.resolve(DoUpdate(stock, ip))
    .then(doc => { return doc })

    return update;
  }
}

const DoUpdate = async (stock, ip) => {
  let updatedDoc = await Stock.findOne({"stock": stock}, (err, doc) => {
    if (err) console.log(err);
    let likes = doc.likes;

    let updated = Promise.resolve(Stock.findOneAndUpdate({"stock": stock}, {"likes": likes + 1, $addToSet: {"ips": ip}}, {new: true, upsert: true}))
    .then(doc => { return doc })

    return updated;
  })

  return updatedDoc;
}

const GetLikes = async (stock) => {  
  let results = await Stock.findOne({"stock": stock}, (err, doc) => {
    if (err) console.log(err);

    return doc;
  })

  return results.likes;
}

const GetPrice = async (stock) => {
  let proxy = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`;

  const price = await fetch(proxy)
                .then((resp) => resp.json())
                .then(data => {return data.latestPrice})
                .catch(err => console.log(err))

  return price;
}

module.exports = GetData;