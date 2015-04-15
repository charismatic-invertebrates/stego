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

    console.log('IS THIS WHAT I EXPECT IT TO BE?', userAccount);
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
        console.log('MONGO USER', createdUser);
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

  getUser: function(req, res, next) {
    module.exports.findUser(req.url.split('xid=')[1], res);
  },

  findUser: function(xid, res) {
    var findOneUser = Q.nbind(User.findOne, User);

    return findOneUser({xid: xid})
      .then(function(foundUser) {
        res.json(foundUser);
      });
  }
};
