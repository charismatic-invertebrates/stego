// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var deferredRequest = Q.nfbind(require('request'));
var apiHandler = require('../APIs/apiHandler.js');
var userCtrl = require('../users/userController.js');
var assignRequestParams = require('../APIs/requestParameters.js');

var auth = {

  // Save a new user in our database
  createNewUserAccount: function(req, res, next){
    var userAccount = req.query.accountCodes;

    // Exchange provider codes for provider tokens
    apiHandler.getTokens(userAccount)

      // Get Github User information
      .then(function() {
        return apiHandler.getGithubData(userAccount);
      })

      // Get user's Fitness Tracker's step-count
      .then(function() {
        return apiHandler.getFitnessData(userAccount);
      })

      // Save user account to database
      .then(function(){
        userCtrl.saveUser(res, userAccount);
      })
      // Catch any errors
      .fail(function(error) {
        console.error(error);
        res.send('We dun goofed', error);
      });
  },
};

module.exports = auth;
