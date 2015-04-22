var React = require('react/addons');
var keys = require('../../../../server/config/clientKeys.js');
var $ = require('jquery');

// We provide App.jsx with a function.  App.jsx binds the 'this' context and invokes auth, returning to it the functions in needs to make calls, and giving auth read/write capabilities on App.jsx's 'this.state' variables.
var auth = function(){
  var app = this;

  // This function gets the date one week ago today. This is being done client side to account for user timezones
  var getOneWeekAgo = function() {
      // Set date to be seven days ago (this accounts for changing months)
      var date = new Date();
      date.setDate(date.getDate()-7);
      
      // Time zone offset calculator from http://stackoverflow.com/a/28149561
      var tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0,-1);

      return localISOTime.replace(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9](\.[0-9][0-9][0-9])?/g, '00:00:00Z');
  };

  // Set AJAXParams inputs a provider and task and returns an object which our AJAX calls use to set their options
  var setAJAXParams = function(provider, usage, param) {
    var callLoc = provider + '-' + usage;

    // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make different calls depending on provider.
    switch(callLoc) {

      // These cases handle getting a provider's code through chrome's WebAuthFlow
      case 'github-login':
        callParams = {
          url: 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID,
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
        };
        break;

      // These cases handle requests to and through our server   
      case 'paired-createAccount':
      callParams = {
        url: 'http://localhost:8000/api/auth/createAccount/',
        data: {
          accountCodes: param,
          timeframe: getOneWeekAgo
        },
        callback: function(res) {
          console.log(res);
          app.storage['xid'] = res.xid;
          app.storage['commitCounts'] = res.commitCounts;
          app.storage['commitDates'] = res.commitDates;
          app.storage['steps'] = res.steps;
        }
      };
      break;

      case 'server-loginAccount':
      callParams = {
        url: 'http://localhost:8000/api/auth/loginAccount',
        data: {
          code: param,
        },
        callback: function(res) {
          console.log(res);
          app.storage['commitCounts'] = res.commitCounts;
          app.storage['commitDates'] = res.commitDates;
          app.storage['steps'] = res.steps;
        }
      };
      break;
    }
    return callParams;
  };

  // This function is modularized to make all GET requests for all APIs
  var makeRequest = function(provider, usage, param) {
    var callParams = setAJAXParams(provider, usage, param);
    console.log(callParams);
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
  };

  // After App.jsx invokes auth.js, we only return these three functions that App.jsx needs access to.
  return {
    // This function is modularized to handle all Login requests for all APIs.  It routes our app information through chrome to a given provider, and returns a code we can exchange for a token to gain access to the API, if loginServer is set as true, it is used to immediately send the github user information to query our server and reply with a user account.
    getCode: function(provider, loginServer) {
      var callParams = setAJAXParams(provider, 'login');
      var updateState = function(update) {
        app.setState(React.addons.update(app.state, update));
      };

      chrome.identity.launchWebAuthFlow({
        'url': callParams.url,
        'interactive': true
        },
        function(redirectUrl) {
          var code = redirectUrl.split('?code=')[1];

          // Saves the code to our user state variable, different if cases determine between github and fitness providers
          if( provider === 'github' ) {
            console.log('saving github code');
            updateState({
              userInfo: {github: {
                code: {$set: code}
              }}
            });
          } else {
            console.log('saving ', provider, ' code');
            updateState({
              userInfo: {fitness: {
                provider: {$set: provider},
                code: {$set: code}
                }}
            });
          }

          // Setting loginServer to true sends the Github code to the server to be processed through the API and used to lookup a user in our server.  If that user is found we reply to our client with the saved information.
          if ( loginServer === true ) {
            app.state.auth.sendToServer('loginAccount');
          }
        }
      );
    },

    // This function sends our code information to the server, it handles the 'pairing' and 'loginAccount' cases.  The first sends codes for both github and jawbone providers which our server uses to get API information, and associate into a user account.  The latter is used to query our database and return an existing account, if one exists.
    sendToServer: function(task){
      var user = app.state.userInfo;
      if( task === 'pairing' && (user.fitness.code !== null && user.github.code !== null) ) {
        var accounts = {
          github: {
            code: user.github.code
          },
          fitness: {
            provider: user.fitness.provider,
            code: user.fitness.code
          }
        };
        makeRequest('paired', 'createAccount', accounts);

      } else if ( task === 'loginAccount' ) {
        makeRequest('server', 'loginAccount', user.github.code);
      }
    },

    // Make a call to server to pull the most recent server-data associated with the current user's xid
    syncAccount: function(){
      console.log('Being built out at the moment');
      // makeRequest('server', 'loadAccount');
    }
  };
};

module.exports = auth;
