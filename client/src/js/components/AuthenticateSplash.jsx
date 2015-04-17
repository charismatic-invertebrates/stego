var React = require('react');

var AuthenticateSplash = React.createClass({

  //TODO: Check if the person is logged in before rendering

  loginUser: function(service) {
    this.props.auth.login(service);
  },

  logUser: function() {
    console.log(this.props.user);
  },

  loginGithub: function(e) {
    this.props.auth.login('github');
  },
  
  // This function logs the user object saved in App.jsx's state
  pairAccounts: function() {
    this.props.auth.pairAccounts();
  },  

  getAccount: function() {
    this.props.auth.getServerAccount();
  },

  render: function() {
    return (
      <div className='sign-in-container'>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button" onClick={this.loginGithub}><img className="icons" src="./images/icons/githubicon.png"/>Sign in with Github</a>
          <div className="or">
            <p>or</p>
          </div>
          <a className="button" onClick={this.getAccount}>Sign Up</a>
        </div>
      </div>
    );
  }

});

module.exports = AuthenticateSplash;
