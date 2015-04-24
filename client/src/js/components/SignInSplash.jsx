var React = require('react');

var SignInSplash = React.createClass({

  getInitialState: function(){
    return {
      showSplash: this.checkAuth(),
      showLogin: true,
      showSignup: false
    };
  },

  checkAuth: function() {
    console.log(localStorage);
    return localStorage.xid === undefined;
  },

  componentDidMount: function() {
    this.setState({
      showSplash: this.checkAuth()
    });
  },

  getProviderCode: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
  },

  pairAccounts: function() {
    this.props.auth.sendToServer('pairing');
    this.setState({showSplash: false});
  },

  render: function() {
    var splashCSS = {display: this.state.showSplash ? 'block' : 'none'};
    var loginCSS = {display: this.state.showLogin ? 'block' : 'none'};
    var signupCSS = {display: this.state.showSignup ? 'block' : 'none'};
    var githubDefaultCSS = {display: this.state.githubAuth ? 'none' : 'inline-block'};
    var githubAuthCSS = {display: this.state.githubAuth ? 'inline-block' : 'none'};
    var jawboneDefaultCSS = {display: this.state.jawboneAuth ? 'none' : 'inline-block'};
    var jawboneAuthCSS = {display: this.state.jawboneAuth ? 'inline-block' : 'none'};
    var pairCSS = {display: this.state.githubAuth && this.state.jawboneAuth ? 'inline-block' : 'none'};

    return (
      <div className="splash-wrapper" style={splashCSS}>
        <div className="sign-in-container">
          <img className="logo" src="./images/stego-logo.png"/>

          <div className="login" style={loginCSS}>
            <div className="button-container">
              <a className="button" onClick={this.getProviderCode.bind(null, 'github', true)}>
                <img className="icons" src="./images/icons/githubicon.png"/>
                Sign in with Github
              </a>
              <div className="or">
                <p>or</p>
              </div>  
              <a className="button" onClick={this.hideLogin}>Sign Up</a>
            </div>
          </div>

          <div className="signup" style={signupCSS}>
            <div className="button-container">
              <a className="button" onClick={this.getProviderCode.bind(null, 'github')} style={githubDefaultCSS}>
                <img className="icons" src="./images/icons/githubicon.png"/>
                Authorize with GitHub
              </a>
              <p style={githubAuthCSS}>
                Thank you for signing in to GitHub.
              </p>
              <div className="or">
                <p>&</p>
              </div>
              <a className="button" onClick={this.getProviderCode.bind(null, 'jawbone')} style={jawboneDefaultCSS}>
                <img className="icons" src="./images/icons/jawboneicon.png"/>
                Authorize with Jawbone
              </a>
              <p style={jawboneAuthCSS}>
                Thank you for signing in to Jawbone.
              </p> 
              <div className="or"></div>
              <a className="button" onClick={this.pairAccounts} style={pairCSS}>Login</a>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = SignInSplash;
