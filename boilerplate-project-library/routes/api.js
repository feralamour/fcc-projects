/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// MongoDB connection
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err) => {
if (!err) { console.log('Successfully Connected in MongoDB') }
else { console.log('Syntax Error: ' + err) }
});

// Database Model/Schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {type: String},
  commentcount: {type: Number},
  comments: {type: Array}
});

const Book = mongoose.model('Book', BookSchema);
// -----
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}).then(bookList => {
        res.json(bookList)
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.send('missing required field title');
      }

      Book.create({
        title: title,
        commentcount: 0,
        comments: []
      }).then(book => {
        return res.json({
          _id: book._id,
          title: book.title
        })
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}).then(result => {
        return res.json('complete delete successful');
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send('no book exists');
      }

      Book.findOne({_id: bookid}).then(book => {
        if(!book) {
          return res.send('no book exists');
        }
        res.json(book);
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send('no book exists');
      }
      if (!comment) {
        return res.send('missing required field comment');
      }
      Book.findByIdAndUpdate({_id: bookid}, {$inc: {commentcount: 1, __v: 1}, "$push": {"comments": comment}}, { 'new': true }).then(book => {
        //console.log(bookid)
        if(!book) {
          return res.send('no book exists');
        }
        res.json(book);
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send('no book exists');
      }

      Book.findOne({ _id: bookid }).then(book => {
        if(!book) {
          return res.send('no book exists');
        }
        Book.deleteOne({ _id: bookid }).then(book => {
          return res.send('delete successful');
        }).catch(err => {
          console.log(err);
        })
      })
    });
  
};
