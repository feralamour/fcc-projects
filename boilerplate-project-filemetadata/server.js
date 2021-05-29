var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer  = require('multer')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Single file upload
app.post('/api/fileanalyse', multer().single('upfile'), (req, res, next) => {
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
  //console.log(req.body, "<= catch req.body")
  //console.log(req.file, "<= catch req.file")
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

// Text only multipart form
app.post('/api/fileanalyse', multer().none(), function (req, res, next) {
  // req.body contains the text fields
  //console.log(req.body, "<= catch req.body")
  //console.log(req.file, "<= catch req.file")
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
