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
        redirect_uri: 'http://localhost:8000',
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

    var deferred = Q.defer();
    deferred.promise.then(function(userAccounts){
    // get token from github
      var tokenParams = auth.assignReqParams('github', 'getToken', userAccounts.github.code);
      auth.getRequest(tokenParams, function(body){
        console.log('BODY OF THE FIRST PROMISE', body);
        userAccounts.github.token = body.access_token;
        console.log('USER ACCOUNTS THAT SHOULD HAVE A TOKEN SAVED TO THEM UNDER GITHUB', userAccounts);
        return userAccounts;
      });
    })
    // get token from fitnessProvider
    .then(function(userAccounts){
      // console.log('This user account should have an access Token: ', userAccounts);
    });
    // .then()
    // get user info from github
    // .then()
    // get user info from fitnessProvider
    // .then()
    // save user in database by github unique id if info from both services is available
    // .then()
    deferred.resolve(req.query.accountCodes);

    //   var userParams = auth.assignReqParams(req.query.provider, 'getUser', body.access_token);
    //   auth.getRequest(userParams, function(body){
    //     console.log('body', body);
    //   });
    // });
  },

  getRequest: function(param, cb){
    request(param, function(err, res, body){
      if(err) {
        console.log(err);
      } else {
        console.log('DOING A GET REQUEST WITH THESE PARAMATERS:', param);
        cb(body);
      }
    });
  },
};

module.exports = auth;