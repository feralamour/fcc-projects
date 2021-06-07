const mongoose = require('mongoose');
const Thread = require('../models/thread.js');

exports.new_reply = (req, res) => {
  let board = req.params.board;
  let thread_id = req.body.thread_id;
  let text = req.body.text;
  let password = req.body.delete_password;

  Thread.findOneAndUpdate({
    _id: thread_id
  }, {
    $addToSet: {
      "replies": {
        _id: new mongoose.Types.ObjectId(),
        thread_id: thread_id,
        text: text,
        delete_password: password,
        reported: false,
        created_on: new Date()
      }
    }
  }, {new: true}).then(
    res.redirect(`/b/${board}/${thread_id}`)
  )
  .catch(err => {console.log(err)})
}

exports.view_thread = (req, res) => {
  let thread_id = req.query.thread_id;
  Thread.findOne({_id: thread_id})
  .sort({created_on: -1})
  .then(entries => {
    //console.log(entries)
    res.json(entries)
  })
  .catch(err => {console.log(err)})
}

exports.delete_reply = (req, res) => {
  let thread_id = req.body.thread_id;
  let reply_id = req.body.reply_id;
  let password = req.body.delete_password;

  Thread.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(thread_id),
    replies: {
      $elemMatch: {
        "_id": new mongoose.Types.ObjectId(reply_id),
        "delete_password": password
      }
    }
  }, {
    "$set": {
      "replies.$.text": "[deleted]"
    }
  }, {new: true}).then(doc => {
    if (doc === null) {
      res.send('incorrect password');
    } else {
      res.send('success');
    }
  })
  .catch(err => {console.log(err)})
}

exports.report_reply = (req, res) => {
  let thread_id = req.body.thread_id;
  let reply_id = req.body.reply_id;

  Thread.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(thread_id),
    "replies._id": new mongoose.Types.ObjectId(reply_id)
  }, {
    "$set": {
      "replies.$.reported": true
    }
  }, {new: true})
  .then(res.send('success'))
  .catch(err => {console.log(err)})
}