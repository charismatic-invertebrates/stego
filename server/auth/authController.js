// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var apiHandler = require('../APIs/apiHandler.js');
var userCtrl = require('../users/userController.js');

var auth = {

  // Save a new user in our database
  createNewUserAccount: function(req, res, next){
    var userAccount = req.query.accountCodes;
    userAccount.time = req.query.timeframe;

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
        res.json(userAccount);
        // userCtrl.saveUser(res, userAccount);
      })
      // Catch any errors
      .fail(function(error) {
        console.error(error);
        res.send('We dun goofed', error);
      });
  },
};

module.exports = auth;
