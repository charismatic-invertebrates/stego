var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  getInitialState: function() {
    this.loginGithub();

    return null;
  },

  // This function logs in to Github, and triggers a series of AJAX calls that extract the user's info, repos, and commits
  loginGithub: function(e) {
    this.props.auth.login('github');
  },
  
  // This function logs the user object saved in App.jsx's state
  logUser: function() {
    console.log(this.props.user);
    console.log(this.props.user.github.totalCommits);
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" currentValue={this.props.user.github.totalCommits} maxValue={20} />
        <a className="button" onClick={this.loginGithub}>Login to Github</a>
      </div>
    );
  }

});

module.exports = CommitsBox;
