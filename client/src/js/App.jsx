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


    // userInfo: {
    //   github: {
    //     requestGithub: function(apiRequest, callback) {
    //       var self = this;
    //       $.ajax({
    //         type: 'GET',
    //         url: 'https://api.github.com' + apiRequest,
    //         data: {access_token: self.token},
    //         success: function(res){
    //           console.log(res);
    //           callback(res);
    //         }
    //       });
    //     },
    //     username: null,
    //     alias: null,
    //     reposUrl: null,
    //     token: null,
    //   }
    // },
    return {
      login: function(provider) {
        var authDetails;

        // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make calls to multiple locations via the input to login.
        switch(provider) {
          case 'github':
            authDetails = {
              loginUrl: 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID,
              tokenUrl: 'https://github.com/login/oauth/access_token',
              data: {
                client_id : keys.github.clientID,
                client_secret : keys.github.clientSecret
              },
              redirect_uri: 'https://bmlpebnpaikchpcabnbieodibjbhcggf.chromiumapp.org/githubToken'
            }
            break;

          case 'fitbit':
            url = 'https://www.fitbit.com/oauth/request_token?oauth_consumer_key=' + keys.fitbit.consumerKey;
            break;
          case 'jawbone':
            url = 'https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=' + keys.jawbone.clientID;
            break;
        }

        chrome.identity.launchWebAuthFlow(
          {'url': authDetails.loginUrl, 'interactive': true},
          function(redirectUrl) {
            var code = redirectUrl.split('?code=')[1];
            authDetails.data.code = code;

            $.ajax({
              type: 'POST',
              url: authDetails.tokenUrl,
              data: authDetails.data,
              redirect_uri: authDetails.redirect_uri,
              success: function(res) {
                var token = res.match(/(?:access_token=)[a-zA-Z0-9]+/g)[0].split('access_token=')[1];
                console.log(app.state);
                app.setState(React.addons.update(app.state, {
                  userInfo: {github: {token: {$set: token} } }
                }));
                console.log(app.state);
                // self.userInfo.github.token = token;
                // self.userInfo.github.requestGithub('/user', function(res){
                //   var github = self.userInfo.github;
                //   github.username = ;
                //   github.alias = ;
                //   github.reposUrl = ;
                // });
              },
              fail: function(err) {
                console.error(err);
              }
            });
        
          }
        );
      },

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
