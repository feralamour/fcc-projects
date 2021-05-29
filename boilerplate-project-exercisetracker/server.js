const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
// Additional modules
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ---
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// MongoDB connection check
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true}, (err) => {
if (!err) { console.log('Successfully Connected in MongoDB') }
else { console.log('Syntax Error: ' + err) }
});

// Database Model Schemas
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {type: String,  unique: true}
});
const User = mongoose.model('User', UserSchema);

const LogSchema = new Schema({
  description: {type: String},
  duration: {type: Number},
  date: {type: Date, default: Date.now},
  userId: {type: Schema.Types.ObjectId, ref: 'User' }

});
const UserLog = mongoose.model('UserLog', LogSchema);

// Fitness TRACKER Project
app.route('/api/users')
.post((req, res) => {
  let newUser = req.body.username;
  // Check if username exists
  User.findOne({username: newUser}).then(user => {
    if (user) {
      res.json("Username already taken");
    } else {
      // Create new user entry
      let saveUser = new User({_id: new mongoose.Types.ObjectId(), username: newUser})
      saveUser.save((err, savedUser) => {
        if (err) return console.error(err);
        //console.log(savedUser, "<= POST NEW USER entry")
        res.json({
          username: savedUser.username,
          _id: savedUser._id
        });
      })
    }
  })
})
.get((req, res) => {
  // Display user list
  User.find({}).then(users => {
    res.send(users)
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {
  //console.log("--- POST EXERCISES ---")
  //console.log(req.body, "<= req.body POST EXERCISES")
  //console.log(req.params, "<= req.params POST EXERCISES")
  //console.log(req.query, "<= req.query POST EXERCISES")
  //console.log('----------')
  //let id = req.body.userId; // local testing
  let {_id} = req.params;
  //let idCheck = (req.params._id === ':_id') ? _id = req.body.userId : _id = req.params._id;

  let date = new Date();
  let now = new Date().toDateString();
  let dateCheck = (req.body.date) ? date = new Date(req.body.date) : date = new Date(now);
  //console.log(date, "<= extracted date")

  let saveLog = new UserLog({
    userId: _id,
    date: date,
    duration: req.body.duration,
    description: req.body.description
  });

  User.findById({_id: _id}).then(user => {
    //console.log(user, "<= found POST EXERCISES user entry")

    saveLog.save((err, doc) => {
      if (err) return console.error(err);
      //console.log(doc)
      res.json({
        "username": user.username,
        "description": doc.description,
        "duration": parseInt(doc.duration),
        "_id": user._id,
        "date": new Date(doc.date).toDateString()
      });
    })
  }).catch(err => {
    console.error(err);
    res.status(500).json({
      success: false
    });
  });
});



app.get('/api/users/:_id/logs', (req, res) => {
  //console.log("--- GET LOGS ---")
  //console.log(req.body, "<= req.body GET LOGS")
  //console.log(req.params, "<= req.params GET LOGS")
  //console.log(req.query, "<= req.query GET LOGS")
  //console.log('----------')
  let _id = req.params._id;
  let dateFrom = req.query.from;
  let dateTo = req.query.to;
  let limit = parseInt(req.query.limit);
  let query = UserLog.find({userId: _id});

  // Build query with optional parameters
  User.findById({_id: _id}).then(user => {
    query.sort({date: 'desc'})
    if (dateFrom) {
      //console.log(dateFrom, "<= FROM date string")
      query.where('date').gte(dateFrom);
    }
    if (dateTo) {
      //console.log(dateTo, "<= TO date string")
      query.where('date').lte(dateTo);
    }
    if (limit) {
      query.limit(limit);
    }
    // Execute the final query
    query.exec()
    .then(docs => {
      //console.log(docs, "<= returned queried documents")
      const response = {
        _id: user._id,
        username: user.username,
        count: docs.length,
        log: docs.map(data => {
          //console.log(data, "<= GET LOGS user mapped user data")
          let dateString = new Date(data.date).toDateString();
          
          return {
            description: data.description,
            duration: data.duration,
            date: dateString
          }
        })
      };
      res.json(response);
    }).catch(err => {
      console.error(err);
      res.status(500).json({
        success: false
      });
    });
  });
});

// ----------
// Legacy Code - does not pass test acceptance criteria anymore
// ----------
app.post('/api/exercise/new-user', (req, res) => {
  console.log(req.body, "<= req.body: expect username, _id")
  console.log('----------')
  let newUser = req.body.username;
  // Check if username exists
  User.findOne({username: newUser}).then(user => {
    if (user) {
      res.json("Username already taken");
    } else {
      // Create new user entry
      let saveUser = new User({_id: new mongoose.Types.ObjectId(), username: newUser})
      saveUser.save((err, savedUser) => {
        if (err) return console.error(err);
        res.json({
          username: savedUser.username,
          _id: savedUser._id
        });
      })
    }
  })
})
app.get('/api/exercise/users', (req, res) => {
  //console.log(req.query, " <= req.query: expect username, _id, __v");
  //console.log('----------')
  User.find({}).then(users => {
    res.send(users);
  });
});
app.post('/api/exercise/add', (req, res) => {
  //console.log(req.params, "<= req.params returns: _id")
  //console.log(req.body, " <= req.body returns: description, duration, date");
  //console.log(req.user, "<= possible app.param catch")
  //console.log('----------')
  let _id = req.user;
  let saveLog = new UserLog({
    userId: req.body.user,
    date: req.body.date,
    duration: req.body.duration,
    description: req.body.description
  });
  
  saveLog.save((err, doc) => {
    if (err) return console.error(err);
    
    User.findById(_id).then(user => {
      let dateString = new Date(req.body.date).toDateString();
      res.json({
        "username": user.username,
        "_id": req.body.userId,
        "date": dateString,
        "duration": saveLog.duration,
        "description": saveLog.description
      });
    }).catch(err => {
      console.error(err);
      res.status(500).json({
        success: false
      });
    });
  });
});
app.get('/api/exercise/log', (req, res) => {
  //console.log(req.params, " <= req.query: userId required, optional params: from, to, limit");
  //console.log('----------')
  let _id = req.params._id;
  let userId = _id;
  let dateFrom = req.query.from;
  let dateTo = req.query.to;
  let limit = parseInt(req.query.limit);
  let query = UserLog.find({userId: userId});

  // Build query with optional parameters
  User.findById(req.params._id).then(user => {
    query.sort({date: 'desc'})
    if (dateFrom) {
      query.where('date').gte(dateFrom);
    }
    if (dateTo) {
      query.where('date').lte(dateTo);
    }
    if (limit) {
      query.limit(limit);
    }
    // Execute the final query
    query.exec()
    .then(docs => {
      const response = {
        username: user.username,
        _id: user._id,
        count: docs.length,
        log: docs.map(data => {
          let dateString = new Date(data.date).toDateString();
          
          return {
            description: data.description,
            duration: data.duration,
            date: dateString
          }
        })
      };
      res.json(response);
    }).catch(err => {
      console.error(err);
      res.status(500).json({
        success: false
      });
    });
  });
});
// ----------
// End Legacy Project Code
// ----------

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const mySecret = process.env['MONGO_URI']
