// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err) => {
  if (!err) { console.log('Successfully Connected in MongoDB\nDatabase Initialized') }
  else { console.log('Syntax Error: ' + err) }
});

// Database Model/Schema
const Schema = mongoose.Schema;
const StockSchema = new Schema({
  stock: {type: String, unique: true},
  likes: {type: Number, default: 0},
  ips: {type: [String], default: []}
});
// -----
const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;