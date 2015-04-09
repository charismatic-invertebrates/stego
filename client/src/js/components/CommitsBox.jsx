var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  loginGithub: function(e) {
    this.props.auth.login('github');
  },

  logUser: function() {
    console.log(this.props.auth.userInfo.github.requestGithub('/user'));
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" parentValue="50" />
        <div className="loginGithub">Login to Github</div>
        <div onClick={this.loginGithub}>Login to Github</div>
        <div onClick={this.logUser}>Console log userInfo</div>
      </div>
    );
  }

});

module.exports = CommitsBox;
