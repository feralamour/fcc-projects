'use strict';

// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true}, (err) => {
if (!err) { console.log('Successfully Connected in MongoDB') }
else { console.log('Syntax Error: ' + err) }
});

// Database Model Schemas
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
  project: {type: String, required: true, index: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: {type: String, default: ''},
  open: {type: Boolean, default: true},
  status_text: {type: String, default: ''}
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

// -----
module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let _id = req.query._id;
      let query = {project: project}; // always filter by project
      
      // Build the query
      let params = [
        '_id',
        'issue_title',
        'issue_text',
        'created_on',
        'updated_on',
        'created_by',
        'assigned_to',
        'open',
        'status_text'
      ];

      params.forEach(field => {
        if(req.query.hasOwnProperty(field)) {
          query[field] = req.query[field];
        }
      })

      // Return any field specified in the query
      Ticket.find(query).then(tickets => {
        res.json(tickets)
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let requiredObj = {};

      let issue_title = req.body.issue_title,
          issue_text = req.body.issue_text,
          created_by = req.body.created_by;
      
      let assigned_to = req.body.assigned_to === '' ? '' : req.body.assigned_to;
      let status_text = req.body.status_text === '' ? '' : req.body.status_text;

      if (issue_title) {
        requiredObj.issue_title = issue_title;
      }
      if (issue_text) {
        requiredObj.issue_text = issue_text;
      }
      if (created_by) {
        requiredObj.created_by = created_by;
      }

      if (Object.keys(requiredObj).length < 3) {
        return res.json({
          error: 'required field(s) missing'
        })
      }
      Ticket.create({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text
      }).then(doc => {
        return res.json({
          _id: doc._id,
          issue_title: doc.issue_title,
          issue_text: doc.issue_text,
          created_on: doc.created_on,
          updated_on: doc.updated_on,
          created_by: doc.created_by,
          assigned_to: doc.assigned_to,
          open: doc.open,
          status_text: doc.status_text
        });
      }).catch(err => {
        console.log(err);
        res.redirect('/');
      })
    })
    .put(function (req, res){
      let project = req.params.project;
      let id = req.body._id;

      // ID missing, no need to continue
      if (!id) {
        return res.json({
          error: 'missing _id'
        })
      }

      // Build the updateObj
      let updateObj = {};
      let count = 0;
      let fields = [
        'issue_title',
        'issue_text',
        'created_by',
        'assigned_to',
        'open',
        'status_text'
      ];

      fields.forEach(field => {
        if(req.body.hasOwnProperty(field)) {
          updateObj[field] = req.body[field];
          count++;
        }
      })

      // Nothing to update
      if (!count) {
        return res.json({
          error: 'no update field(s) sent',
          _id: id
        })
      }
      // Stuff to update
      Ticket
        .updateOne({project, _id: id}, updateObj)
        .then((result) => {
          if(result.n === 0 || result.nModified === 0) {
            return res.json({
              error: 'could not update',
              _id: id
            })
          } else {
            return res.json({
              result: 'successfully updated',
              _id: id
            })
          }
        }).catch(err => {
          console.log(err);
        })
    })
    .delete(function (req, res){
      let project = req.params.project;
      let id = req.body._id;

      if (!id) {
        res.json({
          error: 'missing _id'
        })
      } else {
        Ticket.deleteOne({project, _id: id}).then(results => {
          if (results.n === 1) {
            return res.json({
              result: 'successfully deleted',
              _id: id
            })
          } else {
            return res.json({
              error: 'could not delete',
              _id: id
            })
          }
        })
      };
    });
};
