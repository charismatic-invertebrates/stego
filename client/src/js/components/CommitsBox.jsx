var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({
  getInitialState: function() {
    return {
      currentValue: this.getCurrentCommits()
    }
  },

  // This function logs in to Github, and triggers a series of AJAX calls that extract the user's info, repos, and commits
  getProviderCode: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
  },
  
  // This function logs the user object saved in App.jsx's state
  pairAccounts: function() {
    this.props.auth.sendToServer('pairing');
  },

  syncAccount: function() {
    this.props.auth.syncAccount();
  },

  getCurrentCommits: function() {
    var commits = this.props.commits;
    var today = this.props.startOfDay;
    var commitCount = 0;

    for (var savedDate in commits) {
      if (savedDate === today) {
        commitCount = commits[savedDate];
        break;
      }
    }

    return commitCount;
  },


  componentDidMount: function() {
    this.setState({currentValue: this.getCurrentCommits()});
  },

  shouldComponentUpdate: function(nextProps) {
    if (this.props.commits !== undefined) {
      if (JSON.stringify(nextProps.commits) !== JSON.stringify(this.props.commits)) {
        this.setState({currentValue: this.getCurrentCommits()});
      } 
    }

    return true;
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" currentValue={this.state.currentValue} max={this.props.max} />
        <a className="button" onClick={this.getProviderCode.bind(null, 'github')}>Login to Github</a>

        <a className="button" onClick={this.pairAccounts}>Pair Accounts</a>
        <a className="button" onClick={this.syncAccount}>Sync Account</a>
      </div>
    );
  }

});

module.exports = CommitsBox;
