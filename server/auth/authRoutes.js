// Auth Routes
// -----------
//
// This file routes requests from our client /api/auth in the middleware to methods defined in the auth controller.

var authController = require('./authController.js');

module.exports = function(app) {
  // Route from the /api/auth path. A POST request provides the code which we convert into a token by making a request from the relevant service.
  app.route('/getToken')
    .get(authController.exchangeCode);
    //   // Get token
    //   authController.getToken;
    //   // Go to next handler
    //   next();
    // })
    // .get(function(req, res, next) {
    //   // Get avatar name
    //   authController.getAvatarName;
    // })
    // .post(authController.saveauth);
};
