// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');
var UserServer = require('./userServerModel.js');

module.exports = {

  checkForUser: function(res, xid, server){
    var findOneUser = server === 'server' ?  Q.nbind(UserServer.findOne, UserServer) : Q.nbind(User.findOne, User);

    // Check the database for the user
    return findOneUser({'xid': xid})
      .then(function(foundUser) {

        // If we found a user under that xid, then return that user
        if(foundUser) {
          console.log('found user', foundUser);
          return foundUser;

        // Otherwise we inform the function that called this function that there is not a user under that ID, and allow it to decide what to do from there.
        } else {
          console.log('User does not exist');
          return false;
        }
      });
  },

  // Save a new user in our database (called from authController)
  saveUser: function(res, userAccount) {
    var createUser = Q.nbind(User.create, User);
    var createUserServer = Q.nbind(UserServer.create, UserServer);

    console.log("WE ARE ABOUT TO SAVE THIS, THIS IS THE FINAL FORMAT GO OFF OF THIS", userAccount);
    
    // Populate the User information that we want to save
    var newUser = {
      xid: userAccount.github.user.id,
      repos: userAccount.github.repos,
      commitDates: userAccount.github.user.commitDates,
      commitCounts: userAccount.github.user.commitCounts,
      provider: userAccount.fitness.provider,
      steps: userAccount.fitness.user.items,
    };

    // Populate the UserServer information that we want to save
    var newUserServer = {
      xid: userAccount.github.user.id,
      reposUrl: userAccount.github.user.reposUrl,
      githubUsername: userAccount.github.user.username,
      provider: userAccount.fitness.provider,
      githubToken: userAccount.github.accessToken,
      fitnessToken: userAccount.fitness.accessToken,
    };

    createUser(newUser)
      .then(function(createdUser) {
        res.json(createdUser);
      })
      .then(function() {
        createUserServer(newUserServer);
      })
      .fail(function(error) {
        console.error('Error saving user to database: ', error);
      });

  },

  loadUser: function(req, res, next) {
    // Promisify User.findOne, looks up a client-safe user account
    var findOneUser = Q.nbind(User.findOne, User);
    // Extract uniqueID from request parameters
    var xid = req.url.split('xid=')[1];

    // Use uniqueID to lookup user account
    findOneUser({xid: xid})
      .then(function(foundUser) {
        if(foundUser) {
          // return found user
          res.json(foundUser);
        } else {
          // or inform client that the user does not exist
          res.send(404, 'User not Found');
        }
      });
  },

};
