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
      },

      'jawbone-getToken': {
        uri: 'https://jawbone.com/auth/oauth2/token?client_id=' + keys.jawbone.clientID + 
          '&client_secret=' + keys.jawbone.clientSecret + 
          '&grant_type=authorization_code' +
          '&code=' + param,
      }
    };

    return paramStore[call];
  },

  // Save a new user in our database
  getTokenFromCode: function(req, res, next){
    var userAccounts = req.query.accountCodes;
    var tokenParams = auth.assignReqParams('github', 'getToken', userAccounts.github.code);
    var fitnessParams = auth.assignReqParams(userAccounts.fitness.provider, 'getToken', userAccounts.fitness.code);
    var deferredGet = Q.nfbind(request);
    deferredGet(tokenParams)
      .then(function(body){
        userAccounts.github.accessToken = body[0].body.access_token;
        return userAccounts;
      })
      .then(function(userAccounts){
        deferredGet(fitnessParams)
          .then(function(body){
            userAccounts.fitness.accessToken = JSON.parse(body[0].body).access_token;
            return userAccounts;
        })        
          // get user info from github 
          .then(function(userAccounts){
            var githubUserParams = auth.assignReqParams('github', 'getUser', userAccounts.github.accessToken);
            console.log('githubUserParams', githubUserParams);
            deferredGet(githubUserParams)
              .then(function(body){
                console.log('body', body);
              })
          })
          .then(function(userAccounts){
            console.log('userAccounts', userAccounts);
          }); 
      });

    // .then()
    // get user info from fitnessProvider
    // .then()
    // save user in database by github unique id if info from both services is available
    // .then()
    // deferred.resolve(req.query.accountCodes);

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