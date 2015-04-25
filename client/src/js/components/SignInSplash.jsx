var React = require('react');
var $ = require('jquery');
var SignInSplash = React.createClass({

  getInitialState: function(){
    return {
      toggleBlur: this.toggleBlur(),
      showSplash: this.checkSplashStatus(),
      showLogin: true,
      showSignup: false,
      githubAuth: false,
      jawboneAuth: false,
      loading: false,
      githubLoading: false,
      jawboneLoading: false
    };
  },

  checkSplashStatus: function() {
    return localStorage.xid === undefined;
  },

  componentDidMount: function() {
    this.setState({
      showSplash: this.checkSplashStatus()
    });
    if (this.checkSplashStatus()){
      this.toggleBlur();
    }
  },

  toggleBlur: function(){
    $('.bg').toggleClass('blur');
  },

  toggleTransitionBlur: function(){
    $('.bg').toggleClass('blur-transition').removeClass('blur');
  },
  
  shouldComponentUpdate: function(nextProps) {

    if (nextProps.user.found && (nextProps.user.found !== this.props.user.found)) {
      this.setState({
        showSplash: false
      });
    }

    if (nextProps.user.github.code !== null && !this.state.githubAuth) {
      this.setState({
        githubAuth: true,
        githubLoading: false
      });
    }

    if (nextProps.user.fitness.code !== null && !this.state.jawboneAuth) {
      this.setState({
        jawboneAuth: true,
        jawboneLoading: false
      });
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
    this.setState({'loading': true});

    if (service === 'github') {
      this.setState({'githubLoading': true});
    }

    if (service === 'jawbone') {
      this.setState({'jawboneLoading': true});
    }
  },

  getProviderCodeEnableBlur: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
    this.setState({'loading': true});

    if (service === 'github') {
      this.setState({'githubLoading': true});
    }

    if (service === 'jawbone') {
      this.setState({'jawboneLoading': true});
    }

    // $('.blur').removeClass();
    this.toggleTransitionBlur();
  },

  pairAccounts: function() {
    this.props.auth.sendToServer('pairing');
    this.setState({showSplash: false});
    $('.bg').toggleClass('blur-transition').removeClass('blur');
  },

  render: function() {
    var splashCSS = {display: this.state.showSplash ? 'block' : 'none'};
    var loginCSS = {display: this.state.showLogin ? 'block' : 'none'};
    var signupCSS = {display: this.state.showSignup ? 'block' : 'none'};
    var githubDefaultCSS = {display: this.state.githubAuth ? 'none' : 'block'};
    var githubAuthCSS = {display: this.state.githubAuth ? 'block' : 'none'};
    var jawboneDefaultCSS = {display: this.state.jawboneAuth ? 'none' : 'block'};
    var jawboneAuthCSS = {display: this.state.jawboneAuth ? 'block' : 'none'};
    var pairCSS = {display: this.state.githubAuth && this.state.jawboneAuth ? 'block' : 'none'};

    // Spinners
    var spinnerCSS = {display: this.state.loading ? 'block' : 'none'};
    var githubSpinnerCSS = {display: this.state.githubLoading ? 'block' : 'none'};
    var jawboneSpinnerCSS = {display: this.state.jawboneLoading ? 'block' : 'none'};

    return (
      <div className="splash-wrapper" style={splashCSS}>
        <div className="sign-in-container">
          <img className="logo" src="./images/stego-logo.png"/>

          <div className="login" style={loginCSS}>
            <div className="button-container">
              <a className="button" onClick={this.getProviderCodeEnableBlur.bind(null, 'github', true)}>
                <img className="icons" src="./images/icons/githubicon.png"/>
                Sign in with GitHub
              </a>

              <img className="spinner" style={spinnerCSS} src="./images/icons/spinner.gif" />
            </div>

            <div className="or">
              or
            </div>
            
            <div className="button-container">
              <a className="button" onClick={this.hideLogin}>Sign Up</a>
            </div>
          </div>

          <div className="signup" style={signupCSS}>
            <div className="button-container" style={githubDefaultCSS}>
              <a className="button" onClick={this.getProviderCode.bind(null, 'github')}>
                <img className="icons" src="./images/icons/githubicon.png"/>
                Authorize with GitHub
              </a>
              <img style={githubSpinnerCSS} className="spinner" src="./images/icons/spinner.gif" />  
            </div>
            <p style={githubAuthCSS}>
              Thank you for signing in to GitHub.
            </p>

            <div className="button-container" style={jawboneDefaultCSS}>
              <a className="button" onClick={this.getProviderCode.bind(null, 'jawbone')}>
                <img className="icons" src="./images/icons/jawboneicon.png"/>
                Authorize with Jawbone
              </a>
              <img style={jawboneSpinnerCSS} className="spinner" src="./images/icons/spinner.gif" />
            </div>

            <p style={jawboneAuthCSS}>
              Thank you for signing in to Jawbone. Please complete your Stego registration by clicking "Login" below.
            </p>
            <div className="button-container" style={pairCSS}>
              <a className="button" onClick={this.pairAccounts}>Login</a>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = SignInSplash;
