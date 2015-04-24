var React = require('react');

var SignInSplash = React.createClass({

  getInitialState: function(){
    return {
      showLogin: true,
      showSignup: false,
      githubAuth: this.checkAuth('github'),
      jawboneAuth: this.checkAuth('jawbone'),
      showSplash: this.checkLogin()
    };
  },

  // componentDidMount: function() {
  //   this.setState({githubAuth: this.checkAuth('github')});
  //   this.setState({jawboneAuth: this.checkAuth('jawbone')});
  //   this.setState({showSplash: this.checkLogin()});
  // },

  checkAuth: function(service) {
    console.log('checkAuth: ', this.props.user);
    if (service === 'github') {
      return this.props.user.github.code !== null;
    } else if (service === 'jawbone') {
      return this.props.user.fitness.code !== null;
    } else {
      return false;
    }
  },

  checkLogin: function() {
    if (this.state !== null) {
      if (this.state.githubAuth && this.state.jawboneAuth) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.user.github.code !== null && !this.state.githubAuth) {
      this.setState({githubAuth: true});
    }

    if (nextProps.user.fitness.code !== null && !this.state.jawboneAuth) {
      this.setState({jawboneAuth: true});
    }

    return true;
  },

  hideLogin: function() {
    this.setState({
      showLogin: false,
      showSignup: true
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
              <a className="button" onClick={this.getProviderCode.bind(null, 'github', true)}><img className="icons" src="./images/icons/githubicon.png"/>Sign in with Github</a>
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
