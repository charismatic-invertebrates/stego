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
console.log("ENTERING THE continueCreation SECTION OF THE CODE");
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
    var time = req.query.timeframe;

    userCtrl.checkForUser(res, req.query.xid, 'server')
      .then(function(foundUserServer) {
        if( !foundUserServer ) {
          res.send('User does not exist');
          return null;
        } else {
          return continueSync(foundUserServer, time, res);
        }
      });

    var continueSync = function(foundUserServer, time, res) {
      // Creating an object who's formatting fits with apiHandler's functionality
      var syncAccount = {
        xid: foundUserServer.xid,
        time: time,
        github: {
          user: {
            reposUrl: foundUserServer.reposUrl,
            username: foundUserServer.githubUsername,
            commitDates: [],
            commitCounts: [],
          },
          accessToken: foundUserServer.githubToken,
        },
        fitness: {
          provider: foundUserServer.provider,
          accessToken: foundUserServer.fitnessToken,
          stepDates: [],
          stepCounts: [],
        },
      };
      // Do API requests, create syncAccount object and modify it accordingly
      apiHandler.getGithubData(syncAccount)
        .then(function(syncAccount) {
          return apiHandler.getFitnessData(syncAccount);
        })

        // Pass account to database and update the database
        .then(function(syncAccount) {
console.log("We suspect that xid is not defined before we enter userCtrl, is this true?", syncAccount);
          userCtrl.updateUser(res, syncAccount);
        })

        // Error Handling
        .fail(function(error) {
          console.error('Unable to sync account, ', error);
        });
    };
  }
};

module.exports = auth;
