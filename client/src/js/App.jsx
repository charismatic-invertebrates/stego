// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');
var Auth = require('./components/auth.jsx');

var App = React.createClass({

  getInitialState: function() {
    // Here we should check if there is already an existing user, and set the userInfo values as such.

    return {
    };
  },

  auth: {
    userInfo: {

    },

    login: function() {
      console.log('login');
      chrome.identity.launchWebAuthFlow(
        {'url': 'https://github.com/login/oauth/authorize', 'interactive': true},
        function(redirect_url) {
          console.log(redirect_url);
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
