// This is the App Component, it hosts App-wide resources.

var React = require('react/addons');
var Landscape = require('./components/Landscape.jsx');
var keys = require('../../../server/config/secureAuth.js');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    // Here we should check if there is already an existing user, and set the userInfo values as such.

    return {

      // This property holds all user properties
      userInfo: {
        github: {
          name: null,
          username: null,
          reposUrl: null,
          token: null
        },
        fitness: {
          username: null,
        }
      }
    };
  },
  
  // This is a faux-IIFE for auth so that auth can save the 'this' context.  A regular IIFE statement does not render the correct context.
  componentWillMount: function(){
    this.auth = this.auth();
  },

  // This property holds all Authentication logic.
  auth: function(){
    var app = this;

    var setAJAXParams = function(provider, usage) {
      var callLoc = provider + '-' + usage;
      console.log(callLoc);

      // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make different calls depending on provider.
      switch(callLoc) {
        case 'github-login':
          callParams = {
            loginUrl: 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID,
            tokenUrl: 'https://github.com/login/oauth/access_token',
            data: {
              client_id : keys.github.clientID,
              client_secret : keys.github.clientSecret
            },
            redirect_uri: 'https://bmlpebnpaikchpcabnbieodibjbhcggf.chromiumapp.org/githubToken',
            callback: function(res) {
                        app.setState(React.addons.update(app.state, {
                          userInfo: {github: {
                            name: {$set: res.name},
                            username: {$set: res.login},
                            reposUrl: {$set: res.repos_url}
                          } }
                        }));
                        console.log('Set github user: ', app.state);
                      }
          };
          break;
        case 'github-user':
          callParams = {
            url: 'https://api.github.com/user',
            data: {access_token: app.state.userInfo.github.token},
          };
          break;
        case 'github-commits':
          callParams = {

          };
          break;

        case 'fitbit':
          url = 'https://www.fitbit.com/oauth/request_token?oauth_consumer_key=' + keys.fitbit.consumerKey;
          break;

        case 'jawbone':
          url = 'https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=' + keys.jawbone.clientID;
          break;
      }
      return callParams;
    };

    return {
      login: function(provider) {
        var callParams = setAJAXParams(provider, 'login');

        chrome.identity.launchWebAuthFlow({
          'url': callParams.loginUrl,
          'interactive': true
          },
          function(redirectUrl) {
            // This may be Github specific:
            var code = redirectUrl.split('?code=')[1];
            callParams.data.code = code;

            $.ajax({
              type: 'POST',
              url: callParams.tokenUrl,
              data: callParams.data,
              redirect_uri: callParams.redirect_uri,
              success: function(res) {
                var token = res.match(/(?:access_token=)[a-zA-Z0-9]+/g)[0].split('access_token=')[1];
                app.setState(React.addons.update(app.state, {
                  userInfo: {github: {token: {$set: token} } }
                }));
                console.log('User info saved after login: ', app.state.userInfo);

                // We need to refactor this call to work with all APIs
                app.auth.makeRequest(provider, 'user', callParams.callback); 
              },
              fail: function(err) {
                console.error('failed to authenticate: ', err);
              }
            });
        
          }
        );
      },

      makeRequest: function(provider, usage) {
        var callParams = setAJAXParams(provider, usage);
        console.log(callParams);
        $.ajax({
          type: 'GET',
          url: callParams.url,
          data: callParams.data,
          success: function(res){
            console.log(res);
            callParams.callback(res);
          }
        });


      }

    };

  },

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape userInfo={this.state.userInfo} auth={this.auth} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
