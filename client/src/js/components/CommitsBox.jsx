var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  // This function logs in to Github, and triggers a series of AJAX calls that extract the user's info, repos, and commits
  loginGithub: function(e) {
    this.props.auth.login('github');
  },
  
  // This function logs the user object saved in App.jsx's state
  pairAccounts: function() {
    this.props.auth.pairAccounts();
  },

  loadAccount: function() {
    this.props.auth.loadServerAccount();
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" currentValue={this.props.user.github.dailyCommits} max={this.props.max} />
        <a className="button" onClick={this.loginGithub}>Login to Github</a>
        <a className="button" onClick={this.pairAccounts}>Pair Accounts</a>
        <a className="button" onClick={this.loadAccount}>Load Account from Server</a>
      </div>
    );
  }

});

module.exports = CommitsBox;
