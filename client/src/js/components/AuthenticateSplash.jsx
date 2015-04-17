var React = require('react');
var auth = require('../stores/auth.js');

var AuthenticateSplash = React.createClass({

  getInitialState: function(){
    return {
      showComponent: true
    };
  },

  removeComponent: function(){
    this.setState({showComponent: false});
  },

  logUser: function(){
    console.log(auth.);
    this.removeComponent();
  },

  render: function() {
    var css = {display: this.state.showComponent ? 'block' : 'none'};
    
    return (
      <div className='sign-in-container' style={css}>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button" onClick={this.logUser}><img className="icons" src="./images/icons/githubicon.png"/>Sign in with Github</a>
          <div className="or">
            <p>or</p>
          </div>  
          <a className="button" onClick={this.getAccount}>Sign Up</a>
        </div>
      </div>
    )
  }

});

module.exports = AuthenticateSplash;
