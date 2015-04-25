// User Routes
// -----------
//
// This file routes requests to /api/users in the middleware to methods defined in the User controller.

var userController = require('./userController.js');

module.exports = function(app) {

  // Route from Client which requires user's xid.  Looks up user's xid in db and returns the client-safe user info if it's there
  app.route('/load')
    .get(userController.loadUser);
};
