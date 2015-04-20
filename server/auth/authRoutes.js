// Auth Routes
// -----------
//
// This file routes requests from our client /api/auth in the middleware to methods defined in the auth controller.

var authController = require('./authController.js');

module.exports = function(app) {
  // Route from the /api/auth path. A GET request provides the codes which we convert into tokens (and all the data we need) by making requests from the relevant services.
  app.route('/createAccount')
    .get(authController.createNewUserAccount);

  app.route('/loginAccount')
    .get(authController.loginUser);
};
