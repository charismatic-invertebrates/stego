// User Routes
// -----------
//
// This file routes requests to /api/users in the middleware to specific User methods defined in the User controller.

var userController = require('./userController.js');

module.exports = function(app) {
  app.route('/')
    .get(userController)
}
