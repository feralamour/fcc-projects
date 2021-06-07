const mongoose = require('mongoose');

// Database Model/Schema
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  _id: Schema.Types.ObjectId,
  thread_id: {type: Schema.Types.ObjectId, ref: 'Thread', index: true},
  text: {type: String},
  delete_password: {type: String},
  reported: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_on'
  }
});
// -----

const ThreadSchema = new Schema({
  _id: Schema.Types.ObjectId,
  board: {type: String, required: true, index: true},
  text: {type: String},
  delete_password: {type: String},
  reported: {type: Boolean, default: false},
  replies: [ReplySchema],
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'bumped_on'
  }
});
// -----
const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;