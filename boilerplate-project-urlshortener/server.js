require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
const dns = require('dns');
const url = require('url');
const findOrCreate = require('mongoose-findorcreate');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Mount Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Atlas connection check
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Database Model Schema
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
  original_url: {type: String},
  short_url: {type: String}
});
UrlSchema.plugin(findOrCreate);
const ShortURL = mongoose.model('ShortURL', UrlSchema);

// URL Shortener Project
app.post("/api/shorturl/new", (req, res) => {
  //console.log(url_request, " <= This is the req.body");
  let url_request = req.body.url;
  let newShortURL = shortid.generate();
  let newURL = new ShortURL({
    original_url: url_request,
    short_url: newShortURL
  });

  //check protocols
  if (!url_request.includes("http"||"https")) {
    res.json({error: "invalid url"});
  } else {
    //check hostname
    const urlObj = new URL(url_request);

    dns.lookup(urlObj.hostname, (err, address, family) => {
      if (err) {
        res.json({
          error: "invalid url"
        });
      } else {
        // Find or Create
        ShortURL.create({original_url: url_request, short_url: newShortURL}, (err, val) => {
          if (err) return console.error(err);
          ShortURL.findOrCreate({original_url: url_request}, (err, url, created) => {
            if (err) return console.error(err);
            res.json({
              original_url: url.original_url,
              short_url: url.short_url
            });
          });
        });
      };
    });
  };
});

app.get("/api/shorturl/:suffix", (req, res) => {
  let userSuffix = req.params.suffix;
  //console.log(req.params)
  let shortLinkURL = ShortURL.findOne({short_url: userSuffix}, (err, url) => {
    if (err) return console.error(err);
    //console.log(url)
    //console.log("redirecting to: ", url.original_url)
    res.redirect(url.original_url)
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
