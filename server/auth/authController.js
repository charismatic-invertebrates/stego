// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var deferredRequest = Q.nfbind(require('request'));
var assignRequestParams = require('./requestParameters.js');
var userCtrl = require('../users/userController.js');

var auth = {

  // Save a new user in our database
  getTokenFromCode: function(req, res, next){
    var userAccounts = req.query.accountCodes;
    
    // Get Github token from code
    var githubTokenParams = assignRequestParams('github', 'getToken', userAccounts.github.code);
    deferredRequest(githubTokenParams)
      // Save token to userAccounts
      .then(function(response){
        userAccounts.github.accessToken = response[1].access_token;
        return userAccounts;
      })
      // Get Fitness Provider token from code
      .then(function(){
        var fitnessParams = assignRequestParams(userAccounts.fitness.provider, 'getToken', userAccounts.fitness.code);
        return deferredRequest(fitnessParams);
      })
      // Save Fitness token to userAccounts
      .then(function(response) {
        userAccounts.fitness.accessToken = JSON.parse(response[1]).access_token;
        return userAccounts;
      })
      // Get Github User information
      .then(function() {
        var githubUserParams = assignRequestParams('github', 'getUser', userAccounts.github.accessToken);
        return deferredRequest(githubUserParams);
      })
      // Store Github User information
      .then(function(response) {
        var githubUser = JSON.parse(response[1]);
        userAccounts.github.user = {
          id: githubUser.id,
          reposUrl: githubUser.repos_url,
          username: githubUser.login,
          name: githubUser.name
        };
        return userAccounts;
      })
      // Get Github Repo information
      .then(function(userAccounts) {
        var githubRepoParams = assignRequestParams('github', 'repos', userAccounts.github);
        return deferredRequest(githubRepoParams);
      })
      // Extract individual repo names and store:
      .then(function(response){
        var repos = JSON.parse(response[1]);
        var repoList = [];
        repos.forEach(function(repo) {
          repoList.push(repo.name);
        });
        userAccounts.github.repos = repoList;
      })
      .then(function() {
        console.log('Do we have our repos?', userAccounts);
      })
      .catch(function(error) {
        console.error(error);
      });

        //       get user info from jawbone
        //       .then(function(userAccounts){
        //         var fitnessUserParams = assignRequestParams(userAccounts.fitness.provider, 'getUser', userAccounts.fitness.accessToken);
        //         deferredRequest(fitnessUserParams)
        //           .then(function(body, req){
        //             var parsedBody = JSON.parse(body[1]);
        //             console.log('parsedBody', parsedBody);
        //             // userAccounts.fitness.user = {
        //             // xid: parsedBody.data.xid,
        //             // name: parsedBody.name
        //             // };
        //           });
        //       })
        //       .then(function(userAccounts){
        //         console.log('userAccounts', userAccounts);
        //       }); 
        //   });
      // });

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
