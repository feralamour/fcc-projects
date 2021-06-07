const thread_controller = require('../controllers/thread_controller.js')
const reply_controller = require('../controllers/reply_controller.js')

'use strict';

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .post(thread_controller.new_thread)
    .get(thread_controller.thread_list)
    .delete(thread_controller.delete_thread)
    .put(thread_controller.report_thread);

    
  app.route('/api/replies/:board')
  .post(reply_controller.new_reply)
  .get(reply_controller.view_thread)
  .delete(reply_controller.delete_reply)
  .put(reply_controller.report_reply);
};