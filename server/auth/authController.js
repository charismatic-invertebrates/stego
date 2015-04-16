// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var request = require('request');
var assignRequestParams = require('./requestParameters.js');
var userCtrl = require('../users/userController.js');

var auth = {

  // Save a new user in our database
  getTokenFromCode: function(req, res, next){
    var userAccounts = req.query.accountCodes;
    var tokenParams = assignRequestParams('github', 'getToken', userAccounts.github.code);
    var fitnessParams = assignRequestParams(userAccounts.fitness.provider, 'getToken', userAccounts.fitness.code);
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
            var githubUserParams = assignRequestParams('github', 'getUser', userAccounts.github.accessToken);
            deferredGet(githubUserParams)
              .then(function(body){
                var parsedBody = JSON.parse(body[0].body);
                console.log('JSON.Parse: body[0].body', JSON.parse(body[0].body));
                userAccounts.github.user = {
                  id: parsedBody.id,
                  username: parsedBody.login,
                  name: parsedBody.name
                };
                return userAccounts;
              })
              .then(function(userAccounts){
                userCtrl.saveUser(req, res, userAccounts);
              });
              // get user info from jawbone
              // .then(function(userAccounts){
              //   var fitnessUserParams = assignRequestParams(userAccounts.fitness.provider, 'getUser', userAccounts.fitness.accessToken);
              //   deferredGet(fitnessUserParams)
              //     .then(function(body, req){
              //       var parsedBody = JSON.parse(body[1]);
              //       console.log('parsedBody', parsedBody);
              //       // userAccounts.fitness.user = {
              //       // xid: parsedBody.data.xid,
              //       // name: parsedBody.name
              //       // };
              //     });
              // })
              // .then(function(userAccounts){
              //   console.log('userAccounts', userAccounts);
              // }); 
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
