// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var request = require('request');
var keys = require('../config/secureAuth.js');
var $ = require('jquery');

var auth = {
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
      var userOptions = {
        uri: 'https://api.github.com/user',
        method: 'GET',
        body: {
          access_token: ''
        },
        json: true
      };
    }
    console.log('options', options);
    request(options, function(err, res, body){
      if (err){ 
        console.log(err);
      } else {
        auth.get(body.access_token);
        // console.log('body', body);
        // userOptions.body.access_token = body.access_token;
        // userOptions.header = {
        //   'User-Agent': 'GitFit',
        //   Authorization: body.access_token + ' OAUTH-TOKEN'
        // };
        // console.log('userOptions is', userOptions)
        // request(userOptions, function(err, res, body){
        //   if(err){
        //     console.log(err);
        //   } else {
        //     console.log('body', body);
        //   }
        // });

      }
    });
  },

  get: function(provider, usage, param) {
    callParams = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
      url: 'https://api.github.com/user',
      data: {
        access_token: param,
        // app.state.userInfo.github.token
      },
      callback: function(user) {
        console.log('user', user)
        // app.auth.makeRequest(provider, 'repos');
      }
    };
    // var callParams = setAJAXParams(provider, usage, param);
    request({
      type: 'GET',
      url: callParams.url,
      headers: callParams.header,
      data: callParams.data
    }, function(err, res, body){ 
        if (err){
          console.log(err);
        } else {
          console.log('inside get req, the body is', body)
          callParams.callback(res);
        }
      }
    );
  },
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

module.exports = auth;