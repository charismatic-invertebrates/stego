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
      })
      // Get Fitness Provider token from code
      .then(function(){
        var fitnessParams = assignRequestParams(userAccounts.fitness.provider, 'getToken', userAccounts.fitness.code);
        return deferredRequest(fitnessParams);
      })
      // Save Fitness token to userAccounts
      .then(function(response) {
        userAccounts.fitness.accessToken = JSON.parse(response[1]).access_token;
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
          commits: [],
          username: githubUser.login,
          name: githubUser.name
        };
      })
      // Get Github Repo information
      .then(function() {
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
      // Extract commit information by repo and store on userAccounts:
      .then(function() {
        var repoUrlsToCall = userAccounts.github.repos.map(function(repo) {
          return assignRequestParams('github', 'commits', userAccounts, repo);
        });

        return Q.all(repoUrlsToCall.map(function(callParam) {
          return deferredRequest(callParam);
        }))
          .then(function(results) {
            results.forEach(function(response, index) {
              userAccounts.github.user.commits.push({
                repo: userAccounts.github.repos[index],
                commitsByRepo: JSON.parse(response[1])
              });
            });
          });
      })
      // Get user's Fitness Tracker's step-count
      .then(function() {
        var fitnessStepsParams = assignRequestParams(userAccounts.fitness.provider, 'steps', userAccounts.fitness.accessToken);
        return deferredRequest(fitnessStepsParams);
      })
      // Store user's steps
      .then(function(response) {
        userAccounts.fitness.user = JSON.parse(response[1]).data;
      })
      // Save user account to database
      .then(function(){
        // currently sending to client for testing purposes
        res.json(userAccounts);
      })
      // Catch any errors
      .catch(function(error) {
        console.error(error);
        res.send('We dun goofed');
      });
  },
};

module.exports = auth;
