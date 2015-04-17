// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var deferredRequest = Q.nfbind(require('request'));
var apiHandler = require('../APIs/apiHandler.js');
var userCtrl = require('../users/userController.js');
var assignRequestParams = require('../APIs/requestParameters.js');

var auth = {

  // Save a new user in our database
  createNewUserAccount: function(req, res, next){
    var userAccount = req.query.accountCodes;
    
    apiHandler.getTokens(userAccount)
      // Get Github User information
      .then(function() {
        var githubUserParams = assignRequestParams('github', 'getUser', userAccount.github.accessToken);
        return deferredRequest(githubUserParams);
      })
      // Store Github User information
      .then(function(response) {
        var githubUser = JSON.parse(response[1]);
        userAccount.github.user = {
          id: githubUser.id,
          reposUrl: githubUser.repos_url,
          commits: [],
          username: githubUser.login,
          name: githubUser.name
        };
      })
      // Get Github Repo information
      .then(function() {
        var githubRepoParams = assignRequestParams('github', 'repos', userAccount.github);
        return deferredRequest(githubRepoParams);
      })
      // Extract individual repo names and store:
      .then(function(response){
        var repos = JSON.parse(response[1]);
        var repoList = [];
        repos.forEach(function(repo) {
          repoList.push(repo.name);
        });
        userAccount.github.repos = repoList;
      })
      // Extract commit information by repo and store on userAccount:
      .then(function() {
        var repoUrlsToCall = userAccount.github.repos.map(function(repo) {
          return assignRequestParams('github', 'commits', userAccount, repo);
        });

        return Q.all(repoUrlsToCall.map(function(callParam) {
          return deferredRequest(callParam);
        }))
          .then(function(results) {
            results.forEach(function(response, index) {
              userAccount.github.user.commits.push({
                repo: userAccount.github.repos[index],
                commitsByRepo: JSON.parse(response[1])
              });
            });
          });
      })
      // Get user's Fitness Tracker's step-count
      .then(function() {
        var fitnessStepsParams = assignRequestParams(userAccount.fitness.provider, 'steps', userAccount.fitness.accessToken);
        return deferredRequest(fitnessStepsParams);
      })
      // Store user's steps
      .then(function(response) {
        userAccount.fitness.user = JSON.parse(response[1]).data;
      })
      // Save user account to database
      .then(function(){
        // currently sending to client for testing purposes
        userCtrl.saveUser(res, userAccount);
      })
      // Catch any errors
      .catch(function(error) {
        console.error(error);
        res.send('We dun goofed');
      });
  },
};

module.exports = auth;
