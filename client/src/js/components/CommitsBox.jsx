var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  // This function logs in to Github, and triggers a series of AJAX calls that extract the user's info, repos, and commits
  loginGithub: function(e) {
    this.props.auth.login('github');
  },
  
  // This function logs the user object saved in App.jsx's state
  logUser: function() {
    console.log(this.props.user);
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" parentValue="50" />
        <div onClick={this.loginGithub}>Login to Github, get user, repos, and commits</div>
        <div onClick={this.logUser}>Console log userInfo</div>
      </div>
    );
  }

});

module.exports = CommitsBox;
