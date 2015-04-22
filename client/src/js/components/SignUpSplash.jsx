var React = require('react');
var auth = require('../stores/auth.js');
var SignUpSplash = React.createClass({

  getInitialState: function(){
    return {
      showComponent: true
    };
  },

  // This function logs in to Github, and triggers a series of AJAX calls that extract the user's info, repos, and commits
  getProviderCode: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
  },

  render: function() {

    var css = {display: this.state.showComponent ? 'block' : 'none'};
    
    return (
      <div className='sign-in-container' style={css}>
        <img className="logo" src="./images/stego-logo.png"/>
        <div className='button-container'>
          <a className="button" onClick={this.getProviderCode.bind(null, 'github')}><img className="icons" src="./images/icons/githubicon.png"/>Authorize with GitHub</a>
          <div className="or">
            <p>or</p>
          </div>
          <a className="button" onClick={this.getProviderCode.bind(null, 'jawbone')}><img className="icons" src="./images/icons/jawboneicon.png"/>Authorize with Jawbone</a>
        </div>
      </div>
    )
  }
});

module.exports = SignUpSplash;
