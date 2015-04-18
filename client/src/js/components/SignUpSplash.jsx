var React = require('react');
var auth = require('../stores/auth.js');
var SignUpSplash = React.createClass({

  getInitialState: function(){
    return {
      showComponent: false
    };
  },

  render: function() {

    var css = {display: this.state.showComponent ? 'block' : 'none'};
    
    return (
      <div className='sign-in-container' style={css}>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button" onClick={console.log(auth)}><img className="icons" src="./images/icons/githubicon.png"/>Authorize with GitHub</a>
          <div className="or">
            <p>or</p>
          </div>
          <a className="button"><img className="icons" src="./images/icons/jawboneicon.png"/>Authorize with Jawbone</a>
        </div>
      </div>
    )
  }
});

module.exports = SignUpSplash;
