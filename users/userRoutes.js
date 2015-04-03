// User Routes
// -----------
//
// This file routes requests to /api/users in the middleware to methods defined in the User controller.

var userController = require('./userController.js');

module.exports = function(app) {
  // Route from the /api/users path. A GET request returns the user's avatar type and name. A POST request saves the user in the database.
  app.route('/')
    .get(function(req, res, next) {
      // Get avatar type
      userController.getAvatarType;
      // Go to next handler
      next();
    })
    .get(function(req, res, next) {
      // Get avatar name
      userController.getAvatarName;
    })
    .post(userController.saveUser);
}
