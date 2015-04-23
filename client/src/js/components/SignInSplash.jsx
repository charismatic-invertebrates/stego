var React = require('react');
var auth = require('../stores/auth.js');
var SignUpSplash = require('./SignUpSplash.jsx');


var SignInSplash = React.createClass({

  getInitialState: function(){
    return {
      showComponent: true
    };
  },

  getProviderCode: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
  },

  logUser: function(){
    this.removeComponent();
  },

  render: function() {
    var css = {display: this.state.showComponent ? 'block' : 'none'};
    
    return (
      <div className='sign-in-container login' style={css}>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button" onClick={this.getProviderCode.bind(null, 'github', true)}><img className="icons" src="./images/icons/githubicon.png"/>Sign in with Github</a>
          <div className="or">
            <p>or</p>
          </div>  
          <a className="button" onClick={this.props.hideComponent}>Sign Up</a>
        </div>
      </div>
    )
  }

});

module.exports = SignInSplash;
