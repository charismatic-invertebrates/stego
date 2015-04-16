var keys = require('../config/secureAuth.js');

module.exports = function(provider, usage, param) {
  var callLoc = provider + '-' + usage;

  // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make different calls depending on provider.
  switch(callLoc) {
    
    case 'github-getToken':
      callParams = {
        uri: 'https://github.com/login/oauth/access_token',
        redirect_uri: 'http://localhost:8000',
        method: 'GET',
        body: {
          code: param,
          'client_id': keys.github.clientID,
          'client_secret': keys.github.clientSecret
        },
        json: true
      };
      break;

    case 'github-getUser':
      callParams = {
        headers: {
          'User-Agent': 'GitFit',
          Authorization: 'token ' + param
        },
        url: 'https://api.github.com/user',
      };
      break;

    case 'github-repos': 
      callParams = {
        url: app.state.userInfo.github.reposUrl,
        data: {access_token: app.state.userInfo.github.token},
        callback: function(repos){
          var reposList = [];
          
          repos.forEach(function(repo) {
            reposList.push(repo.name);
          });
          updateState({
            userInfo: {github: {
              repos: {$set: reposList}
            }}
          });
          // console.log('Saved user repos: ', reposList);
          // console.log('Confirm via log User');

          app.state.userInfo.github.repos.forEach(function(repo) {
            app.auth.makeRequest('github', 'commits', repo);
          });
        }
      };
      break;
    case 'github-commits':
      callParams = {
        url: 'https://api.github.com/repos/' + app.state.userInfo.github.username + '/' + param + '/commits?author=' + app.state.userInfo.github.username + '&since=' + app.state.day,
        data: {access_token: app.state.userInfo.github.token},
        callback: function(commits) {
          commits.forEach(function(commitInfo) {
            updateState({
              userInfo: {github: {
                commitsByRepo: {$push: [{repo: param, stats: commitInfo}]},
                totalCommits: {$set: app.state.userInfo.github.totalCommits + 1}
              }}
            });
          });
        }
      };
      break;

    case 'jawbone-getToken':
      callParams = {
        uri: 'https://jawbone.com/auth/oauth2/token?client_id=' + keys.jawbone.clientID + 
          '&client_secret=' + keys.jawbone.clientSecret + 
          '&grant_type=authorization_code' +
          '&code=' + param,
      };
      break;

    case 'jawbone-user':
      callParams = {
        url: 'https://jawbone.com/nudge/api/v.1.1/users/@me',
        headers: {'Authorization': 'Bearer ' + param},  
      };
      break;

    case 'jawbone-moves':
      callParams = {
        url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves',
        header: {'Authorization': 'Bearer ' + app.state.userInfo.fitness.token},  
        callback: function(res){
          console.log(res);
          updateState({
            userInfo: {fitness: {
              moves: {$set: res.data},
            }}
          });
        }
      };
      break;
    }
  return callParams;
};