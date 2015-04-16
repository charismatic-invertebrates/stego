var keys = require('../config/secureAuth.js');

module.exports = function(provider, usage, param, loopedParam) {
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
        url: param.user.reposUrl,
        headers: {
          'User-Agent': 'GitFit',
          Authorization: 'token ' + param.accessToken
        }
      };
      break;
 
    case 'github-commits':
      callParams = {
        url: 'https://api.github.com/repos/' + param.github.user.username + '/' + loopedParam + '/commits?author=' + param.github.user.username, //+ '&since=' + app.state.day,
        headers: {
          'User-Agent': 'GitFit',
          Authorization: 'token ' + param.github.accessToken
        },
        repoName: loopedParam
        // callback: function(commits) {
        //   commits.forEach(function(commitInfo) {
        //     updateState({
        //       userInfo: {github: {
        //         commitsByRepo: {$push: [{repo: param, stats: commitInfo}]},
        //         totalCommits: {$set: app.state.userInfo.github.totalCommits + 1}
        //       }}
        //     });
        //   });
        // }
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

    case 'jawbone-steps':
      callParams = {
        url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves',
        headers: {'Authorization': 'Bearer ' + param},  
      };
      break;
      
    }
  return callParams;
};