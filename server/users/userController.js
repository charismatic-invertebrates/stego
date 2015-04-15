// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');
var UserServer = require('./userServerModel.js');

module.exports = {

  // Save a new user in our database
  saveUser: function(req, res, userAccount) {

    var createUser = Q.nbind(User.create, User);
    var createUserServer = Q.nbind(UserServer.create, UserServer);
    
    var newUser = {
      xid: userAccount.github.user.id,
      githubUsername: userAccount.github.user.username,
      githubName: userAccount.github.user.name,
      repos: 'repos are incoming',
      commits: 'commits are incoming',
      provider: userAccount.fitness.provider,
      steps: 'steps are incoming',
    };

    var newUserServer = {
      xid: userAccount.github.user.id,
      provider: userAccount.fitness.provider,
      githubToken: userAccount.github.accessToken,
      fitnessToken: userAccount.fitness.accessToken,
    };

    createUser(newUser)
      .then(function(createdUser) {
        res.json(createdUser);
        module.exports.findUser(createdUser.xid);
        createUserServer(newUserServer)
          .fail(function(error) {
            console.log(error);
          });
      })
      .fail(function(error) {
        console.log(error);
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
