const mongoose = require('mongoose');
const Thread = require('../models/thread.js');

exports.new_thread = (req, res) => {
  let board = req.params.board;
  let text = req.body.text;
  let delete_password = req.body.delete_password;

  Thread.create({
    _id: new mongoose.Types.ObjectId(),
    board: board,
    text: text,
    created_on: new Date(),
    bumped_on: new Date(),
    reported: false,
    delete_password: delete_password,
    replies: []
  }).then(res.redirect(`/b/${board}/`))
  .catch(err => {console.log(err)})
}

exports.thread_list = (req, res) => {
  let board = req.params.board;

  Thread.find({board: board}, {
    "reported": 0,
    "delete_password": 0,
    "replies.reported": 0,
    "replies.delete_password": 0
  })
  .sort({bumped_on: -1})
  .limit(10)
  .then(threads => {
    threads.forEach((doc) => {
      if (doc.replies.length > 3) {
        doc.replies = doc.replies.slice(-3)
      }
      return doc.replies
    })
    res.json(threads)
  })
  .catch(err => {console.log(err)})
}

exports.delete_thread = (req, res) => {
  let id = req.body.thread_id;
  let password = req.body.delete_password;

  Thread.deleteOne({_id: new mongoose.Types.ObjectId(id), delete_password: password}).then(doc => {
    if (doc.deletedCount === 1) {
      res.send('success');
    } else {
      res.send('incorrect password');
    }
  })
  .catch(err => {console.log(err)})
}

exports.report_thread = (req, res) => {
  let id = req.body.report_id;

  Thread.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)}, {reported: true}, {new: true})
  .then(doc => {
    res.send('success')})
  .catch(err => {console.log(err)})
}