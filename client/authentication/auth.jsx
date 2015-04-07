// Authentication
//________________

// Require statements.  OAuth is for the OAuth.io API we are using to abstract authentication.  Key is our private key provided by OAuth.io.  You must create this file and export your own private key for it to work.
var React = require('react');
var $ = require('jquery');
var key = require('../../server/config/secureAuth.js');

var test = chrome;

OAuth.initialize(key);
$(document).ready(function(){
  $('.loginGithub').on('click', function() {
    console.log('in alleged background page');
    console.log('should be some chrome thing: ', test);
    test.identity.launchWebAuthFlow(
        {'url': 'https://github.com/login/oauth/authorize', 'interactive': true},
        function(redirect_url) {
          console.log(redirect_url);
        }
      );
  });
});

var Authentication = {

  userInfo: {
    username: null,
    github: null,
    githubID: null,
    fitness: null,
    fitnessID: null
  },

  login : function(provider) {
    chrome.identity.launchWebAuthFlow(
      {'url': 'https://github.com/login/oauth/authorize', 'interactive': true},
      function(redirect_url) {
        console.log(redirect_url);
      }
    );

    // OAuth.popup(provider)
    //   .done(function(result) {
    //     if(provider === 'github'){
    //       console.log(this.userInfo);
    //       console.log(result);
    //       this.userInfo.github = result;
    //       result.me().done(function(result){this.userInfo.githubID = result});
    //     } else {
    //       this.userInfo.fitness = result;
    //       result.me().done(function(result){this.userInfo.fitnessID = result});
    //     }
        
    //     //use result.access_token in your API request 
    //     //or use result.get|post|put|del|patch|me methods (see below)
    //   })
    //   .fail(function (err) {
    //     console.error(err);
    // });
  },

  render: function() {
    return (
      <div>
        <span>Github: </span>
        <button onClick={this.login.bind(this, 'github')}>Login with Github</button>

        <span>Login with a Fitness Tracker:</span>
        <button onClick={this.login.bind(this, 'fitbit')}>FitBit</button> <span>or</span><button onClick={this.login.bind(this,   'jawbone')}>Jawbone</button>
      </div>
    );
  }

};

module.exports = Authentication;


