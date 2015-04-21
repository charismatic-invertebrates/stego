// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var apiHandler = require('../APIs/apiHandler.js');
var userCtrl = require('../users/userController.js');

var auth = {

  // Save a new user in our database
  createNewUserAccount: function(req, res){
    var userAccount = req.query.accountCodes;
    userAccount.time = req.query.timeframe;

    // Exchange provider codes for provider tokens
    apiHandler.getTokens(userAccount)

      // Get Github User information
      .then(function() {
        return apiHandler.getGithubUser(userAccount);
      })

      // Check if this user is in our database, if so, reply with user.  Otherwise, continue to create a new user
      .then(function(userAccount) {
        return userCtrl.checkForUser(res, userAccount.github.user.id)
          .then(function(foundUser) {
            if( foundUser ) {
              res.json(foundUser);
              return null;
            } else {
              return continueCreation();
            }
          });
      });

    // The second half of user creation has been extracted into a second function to allow us to short circuit user creation in the event that a user already exists.
    var continueCreation = function() {

      // Get github api information
      return apiHandler.getGithubData(userAccount)

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
        res.send('Error creating new user', error);
      });
    };
  },

  loginUser: function(req, res) {
    var userAccount = {github: {code: req.query.code} };

    // Exchange Github code for token
    apiHandler.getTokens(userAccount)

    // Get user information from Github
    .then(function() {
      return apiHandler.getGithubUser(userAccount);
    })

    // Use user information to query our database for a pre-existing user
    .then(function() {
      userCtrl.checkForUser(res, userAccount.github.user.id)
        .then(function(foundUser) {
          if( !foundUser ) {
            res.status(404).send('No account found for this login');
          } else {
            console.log('We found a user');
            res.json(foundUser);
          }
        });
    });
  },

  syncAccount: function(req, res) {
    console.log('syncing account');
    userCtrl.checkForUser(res, req.query.xid, 'server')
      .then(function(foundUserServer) {
        if( !foundUserServer ) {
          res.send('User does not exist');
          return null;
        } else {
          console.log('should try to continue to sync');
          return continueSync(foundUserServer);
        }
      });

    var continueSync = function(foundUserServer) {
      console.log('in continueSync');
      console.log('in sync continuation, here is our found user: ', foundUserServer);
      return 'cats';
    };
  }
};

module.exports = auth;
