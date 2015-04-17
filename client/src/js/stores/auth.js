var React = require('react/addons');
var app = require('../App.jsx');
var keys = require('../../../../server/config/secureAuth.js');
var $ = require('jquery');

// This property holds all Authentication logic, it holds app and setAJAXParams in closure scope.
auth = {

  // Set AJAXParams inputs a provider and task and returns an object which our AJAX calls use to set their options.
  setAJAXParams: function(provider, usage, param) {
    var callLoc = provider + '-' + usage;
    var updateState = function(update) {
      app.setState(React.addons.update(app.state, update));
    };

    // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make different calls depending on provider.
    switch(callLoc) {
      case 'github-login':
        callParams = {
          url: 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID,
          callback: function(code) {
            console.log('in login');
            updateState({
              userInfo: {github: {
                code: {$set: code}
              }}
            });
          }
        };
        break;
      
      case 'fitbit-login':
        callParams = {
          url: 'https://api.fitbit.com/oauth/request_token?oauth_callback=https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/fitbit&oauth_consumer_key=' + keys.fitbit.consumerKey
        };
        break;

      case 'jawbone-login':
        callParams = {
          url: 'https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=' + keys.jawbone.clientID + '&scope=move_read&redirect_uri=https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/jawbone',
          callback: function(code) {
            console.log('in login');
            updateState({
              userInfo: {fitness: {
                provider: {$set: provider},
                code: {$set: code}
              }}
            });
          }
        };
        break;
   
      case 'paired-createAccount':
      callParams = {
        url: 'http://localhost:8000/api/auth/createAccount/',
        data: {
          accountCodes: param,
        },
        callback: function(res) {
          console.log(res);
          localStorage.setItem('xid', res.xid);
          localStorage.setItem('commits', res.commits);
          localStorage.setItem('steps', res.steps);
        }
      };
      break;

      // This case passes the userID from localStorage, and returns the user's info if there is a user corresponding to that xid.
      case 'server-loadAccount':
      callParams = {
        url: 'http://localhost:8000/api/user/load',
        data: {
          xid: localStorage.xid,
        },
        callback: function(res) {
          console.log('this is the response from our server, should be our account: ', res);
        }
      };
      break;
    }
    return callParams;
  },

  // This function is modularized to handle all Login requests for all APIs
  login: function(provider) {
    var callParams = setAJAXParams(provider, 'login');

    chrome.identity.launchWebAuthFlow({
      'url': callParams.url,
      'interactive': true
      },
      function(redirectUrl) {
        var user = app.state.userInfo;
        var code = redirectUrl.split('?code=')[1];
        callParams.callback(code);
        if( user.fitness.code === null || user.github.code === null ) {
          console.log('authenticate with both providers please');
        }
      }
    );
  },

  pairAccounts: function(){
    var user = app.state.userInfo;
    if( user.fitness.code === null || user.github.code === null ) {
      console.log('authenticate with both providers please');
    } else {
      var accounts = {
        github: {
          code: user.github.code
        },
        fitness: {
          provider: user.fitness.provider,
          code: user.fitness.code
        }
      };
      app.auth.makeRequest('paired', 'createAccount', accounts);
    }
  },

  // Make a call to server to re-load the data being stored in the database.
  loadServerAccount: function(){
    app.auth.makeRequest('server', 'loadAccount');
  },
  
  // This function is modularized to make all GET requests for all APIs
  makeRequest: function(provider, usage, param) {
    var callParams = setAJAXParams(provider, usage, param);
    $.ajax({
      type: 'GET',
      url: callParams.url,
      headers: callParams.header,
      data: callParams.data,
      success: function(res) {
        callParams.callback(res);
      },
      fail: function(err) {
        console.error('GET request failed: ', err);
      }
    });
  },

  // This function is modularized to make all POST requests for all APIs
  postRequest: function(provider, usage, param) {
    var callParams = setAJAXParams(provider, usage, param);
    $.ajax({
      type: 'POST',
      url: callParams.url,
      data: callParams.data,
      redirect_uri: callParams.redirect_uri,
      success: function(res) {
        console.log('POST response: ', res);
        callParams.callback(res);
      },
      fail: function(err) {
        console.error('POST request failed: ', err);
      }
    });
  }
};

module.exports = auth;
