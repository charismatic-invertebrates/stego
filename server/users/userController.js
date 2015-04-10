// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');

module.exports = {

  // Save a new user in our database
  saveUser: function(req, res, next) {
    var createUser = Q.nbind(User.create, User);

    var newUser = {
      githubID: req.body.githubID,
      fitbitID: req.body.fitbitID,
      jawboneID: req.body.jawboneID,
    };

    createUser(newUser)
      .then(function(createdUser) {
        if (createdUser) {
          res.json(createdUser);
        }
      })
      .fail(function(error) {
        next(error);
      });
  }
};
