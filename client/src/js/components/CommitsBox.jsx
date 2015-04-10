var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  loginGithub: function(e) {
    this.props.auth.login('github');
  },

  logUser: function() {
    console.log(this.props.user);
  },

  getAndSaveRepos: function(){
    this.props.auth.makeRequest('github', 'repos');
  },

  getCommits: function(){
    var request = this.props.auth.makeRequest;
    this.props.user.github.repos.forEach(function(repo) {
      request('github', 'commits', repo);
    });
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
