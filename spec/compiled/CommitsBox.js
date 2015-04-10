var React = require('react');
var Chart = require('./Chart.js');

var CommitsBox = React.createClass({displayName: "CommitsBox",

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
      React.createElement("div", {className: "commits-box"}, 
        React.createElement("h2", null, "Commits"), 
        React.createElement(Chart, {parentId: "commits-chart", parentValue: "50"}), 
        React.createElement("div", {onClick: this.loginGithub}, "Login to Github"), 
        React.createElement("div", {onClick: this.logUser}, "Console log userInfo"), 
        React.createElement("div", {onClick: this.getAndSaveRepos}, "Get, save, and log Repo names"), 
        React.createElement("div", {onClick: this.getCommits}, "Get and log commits")
      )
    );
  }

});

module.exports = CommitsBox;
