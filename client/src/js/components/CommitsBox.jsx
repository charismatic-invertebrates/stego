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


// var yearCommits = function(since) {
//     githubID.commits = 0;
//     github.get('users/' + githubID.alias + '/repos')
//       .done(function(repos) {
//         _.each(repos, function(repo) {
//           github.get('repos/' + githubID.alias + '/' + repo.name + '/stats/contributors')
//             .done(function(contributors) {
//               console.log(repo.name);
//               console.log(contributors);
//               _.each(contributors, function(info){console.log('name: ',info.author.login, 'commits: ', info.total)});
//             })
//             .fail(function(err) {
//               console.error(err);
//             });
//         });
//       })
//       .fail(function(err) {
//         console.error(err);
//       });
//   }

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" parentValue="50" />
        <div className="loginGithub">Login to Github</div>
        <div onClick={this.loginGithub}>Login to Github</div>
        <div onClick={this.logUser}>Console log userInfo</div>
        <div onClick={this.getAndSaveRepos}>Get, save, and log Repo names</div>
        <div onClick={this.getCommits}>Get and log commits</div>
      </div>
    );
  }

});

module.exports = CommitsBox;
