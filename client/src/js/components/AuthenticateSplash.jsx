var React = require('react');
var Blur = require('react-blur');

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
        <div className='button-container'>
          <a className="button" onClick={this.loginUser.bind(null, 'jawbone')}>Login to Jawbone</a>
          <a className="button" onClick={this.loginGithub}>Login to Github</a>
          <a className="button" onClick={this.pairAccounts}>Pair Accounts</a>
          <a className="button" onClick={this.getAccount}>Get Account from Server</a>
        </div>
        <Blur img='../images/landscape/landscape-dawn.png' blurRadius={5}>
            The content.
        </Blur>
      </div>
    );
  }

});

module.exports = AuthenticateSplash;
