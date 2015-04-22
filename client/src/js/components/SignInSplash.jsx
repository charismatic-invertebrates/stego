var React = require('react');
var auth = require('../stores/auth.js');
var SignUpSplash = require('./SignUpSplash.jsx');


var SignInSplash = React.createClass({

  getInitialState: function(){
    return {
      showComponent: true
    };
  },

  logUser: function(){
    this.removeComponent();
  },

  render: function() {
    var css = {display: this.state.showComponent ? 'block' : 'none'};
    
    return (
      <div className='sign-in-container' style={css}>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button"><img className="icons" src="./images/icons/githubicon.png"/>Sign in with Github</a>
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
