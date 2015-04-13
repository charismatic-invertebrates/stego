// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var request = require('request');
var keys = require('../config/secureAuth.js');

module.exports = {

  // Save a new user in our database
  exchangeCode: function(req, res, next){
    var options = {};
    if (req.query.provider === 'github'){
      options = {
        uri: 'https://github.com/login/oauth/access_token',
        method: 'GET',
        body: {
          code: req.query.code,
          client_id : keys.github.clientID,
          client_secret : keys.github.clientSecret
        },
        json: true
      };
    }
    console.log('options', options);
    request(options, function(err, res, body){
      console.log('body', body);
      console.log('err', err);
    });
  }
  // saveUser: function(req, res, next) {
  //   var createUser = Q.nbind(User.create, User);
  //   console.log(req.body);
  //   var newUser = {
  //     githubID: req.body.githubID,
  //     fitbitID: req.body.fitbitID,
  //     jawboneID: req.body.jawboneID,
  //   };

  //   createUser(newUser)
  //     .then(function(createdUser) {
  //       if (createdUser) {
  //         res.json(createdUser);
  //       }
  //     })
  //     .fail(function(error) {
  //       next(error);
  //     });
  // }
};
