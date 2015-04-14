// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var request = require('request');
var keys = require('../config/secureAuth.js');
var $ = require('jquery');

var auth = {
  // This function assigns paramaters for an API request.
  assignReqParams: function(provider, usage, param){
    var call = provider + '-' + usage;
    var paramStore = {
      
      'github-getToken': {
        uri: 'https://github.com/login/oauth/access_token',
        method: 'GET',
        body: {
          code: param,
          'client_id': keys.github.clientID,
          'client_secret': keys.github.clientSecret
        },
        json: true
      },

      'github-getUser': {
        headers: {
          'User-Agent': 'GitFit',
          Authorization: 'token ' + param
        },
        url: 'https://api.github.com/user',
        callback: function(user) {
          console.log('come on down user:', user);
          // app.auth.makeRequest(provider, 'repos');
        }
      }
    };
    return paramStore[call];
  },

  // Save a new user in our database
  getTokenFromCode: function(req, res, next){
    var tokenParams = auth.assignReqParams(req.query.provider, 'getToken', req.query.code);
    auth.getRequest(tokenParams, function(body){
      var userParams = auth.assignReqParams(req.query.provider, 'getUser', body.access_token);
      auth.getRequest(userParams, function(body){
        console.log('body', body);
      });
    });
  },

  getRequest: function(param, cb){
    request(param, function(err, res, body){
      if(err) {
        console.log(err);
      } else {
        console.log('param:', param);
        cb(body);
      }
    });
  },
};

module.exports = auth;