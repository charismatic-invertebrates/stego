// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');

module.exports = {

  // Retrieve type of user avatar
  getAvatarType: function(req, res, next) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({ githubID: req.body.githubID })
      .then(function(user) {
        res.json(user.avatar.type);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Retrieve name of user avatar
  getAvatarName: function(req, res, next) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({ githubID: req.body.githubID })
      .then(function(user) {
        res.json(user.avatar.name);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Save a new user in our database
  saveUser: function(req, res, next) {
    var createUser = Q.nbind(User.create, User);

    var newUser = {
      githubID: req.body.githubID,
      avatar: {
        type: req.body.avatar.type,
        name: req.body.avatar.name
      }
    };

    createUser(newUser)
      .then(function(createdUser) {
        if (createdUser) {
          res.json(createdUser);
        }
      })
      .fail(function(error) {
        next(error);
      })
  }
};
