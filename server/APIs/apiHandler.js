// API Handler
//_____________
//
// The API Handler is a collection of promises that can be called from elsewhere to simplify code readability.

var Q = require('q');
var deferredRequest = Q.nfbind(require('request'));
var assignRequestParams = require('./requestParameters.js');

module.exports = {

  // Takes in a userAccount, exchanges the provider codes in the account object for their respective tokens.
  getTokens: function(userAccount) {
    // Get Github token from code
    var githubTokenParams = assignRequestParams('github', 'getToken', userAccount.github.code);

    return deferredRequest(githubTokenParams)
      // Save token to userAccount
      .then(function(response){
        userAccount.github.accessToken = response[1].access_token;
      })
      // Get Fitness Provider token from code
      .then(function(){
        var fitnessParams = assignRequestParams(userAccount.fitness.provider, 'getToken', userAccount.fitness.code);
        return deferredRequest(fitnessParams);
      })
      // Save Fitness token to userAccount
      .then(function(response) {
        userAccount.fitness.accessToken = JSON.parse(response[1]).access_token;
        return userAccount;
      })
      .fail(function(error) {
        console.error('Error in apiHandler.getTokens, token exchange failed: ', error);
      });
  },

  getGithubData: function(userAccount) {
    var githubUserParams = assignRequestParams('github', 'getUser', userAccount.github.accessToken);

    return deferredRequest(githubUserParams)
    // Store Github User information
      .then(function(response) {
        var githubUser = JSON.parse(response[1]);
        userAccount.github.user = {
          id: githubUser.id,
          reposUrl: githubUser.repos_url,
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
        var commitCount = {};
        var repoUrlsToCall = userAccount.github.repos.map(function(repo) {
          return assignRequestParams('github', 'commits-weekly', userAccount, repo);
        });

        return Q.all(repoUrlsToCall.map(function(callParam) {
          return deferredRequest(callParam);
        }))
          .then(function(results) {
            results.forEach(function(response) {
              var commits = JSON.parse(response[1]);
              commits.forEach(function(commitInfo){
                var commitDate = commitInfo.commit.committer.date.match(/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/)[0];
                commitCount[commitDate] = commitCount[commitDate] + 1 || 0;
              });
            });
          })
          .then(function() {
            userAccount.github.user.commits = commitCount;
          });
      })

      .fail(function(error) {
        console.error('Error in apiHandler.getGithubData, failed to get Github data: ', error);
      });
  },

  getFitnessData: function(userAccount) {
    var fitnessStepsParams = assignRequestParams(userAccount.fitness.provider, 'steps', userAccount.fitness.accessToken);

    return deferredRequest(fitnessStepsParams)
      // Store user's steps
      .then(function(response) {
        userAccount.fitness.user = JSON.parse(response[1]).data;
        return userAccount;
      })
      .fail(function(error) {
        console.error('Error in apiHandler.getFitnessData, failed to get steps: ', error);
      });
  }

};
