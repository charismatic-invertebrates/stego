// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');
var keys = require('../../../server/config/secureAuth.js');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    // Here we should check if there is already an existing user, and set the userInfo values as such.

    return {
    };
  },

  auth: {
    userInfo: {
      github: {
        token: null,
      }
    },

    login: function(provider) {
      var self = this;
      var url = '';
      console.log(provider);
      switch(provider) {
        case 'github':
          url = 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID;
          break;
        case 'fitbit':
          url = 'https://www.fitbit.com/oauth/request_token?oauth_consumer_key=' + keys.fitbit.consumerKey;
          break;
        case 'jawbone':
          url = 'https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=' + keys.jawbone.clientID;
          break;
      }
      console.log(url);
      chrome.identity.launchWebAuthFlow(
        // This portion works with all APIs
        {'url': url, 'interactive': true},
        function(redirectUrl) {
          var code = redirectUrl.split('?code=')[1];
          // This AJAX call is coded to work with github
          $.ajax({
            type: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            data: {client_id: keys.github.clientID,
                   client_secret: keys.github.clientSecret,
                   code: code
                  },
            redirect_uri: 'https://bmlpebnpaikchpcabnbieodibjbhcggf.chromiumapp.org/githubToken',
            success: function(res) {
              var token = res.match(/(?:access_token=)[a-zA-Z0-9]+/g)[0].split('access_token=')[1];
              console.log(self);
              self.userInfo.github.token = token;
            },
            fail: function(err) {
              console.error(err);
            }
          });
        }
      );
    },

  },

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape user={this.state.userInfo} auth={this.auth} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
