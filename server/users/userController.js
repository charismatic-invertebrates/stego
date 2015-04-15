// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');

module.exports = {

  // Save a new user in our database
  saveUser: function(req, res, userAccount) {

    console.log('IS THIS WHAT I EXPECT IT TO BE?', userAccount);
    var createUser = Q.nbind(User.create, User);
    
    var newUser = {

      xid: userAccount.github.user.id,
      githubUsername: userAccount.github.user.username,
      githubName: userAccount.github.user.name,
      repos: 'repos are incoming',
      commits: 'commits are incoming',
      provider: userAccount.fitness.provider,
      steps: 'steps are incoming',
      githubToken: userAccount.github.accessToken,
      fitnessToken: userAccount.fitness.accessToken,

    };

    createUser(newUser)
      .then(function(createdUser) {
        console.log('MONGO USER', createdUser);
        res.json(createdUser);
        module.exports.findUser(createdUser.xid);
      })
      .fail(function(error) {
        console.log(error);
      });
  },

  getUser: function(req, res, next) {
    console.log(req);
    res.send('This is totally working');
  },

  findUser: function(xid) {
    var findOneUser = Q.nbind(User.findOne, User);

    findOneUser({xid: xid})
      .then(function(foundUser) {
        console.log('I FOUND THIS FOR YOU: ', foundUser);
      });
  }
};
