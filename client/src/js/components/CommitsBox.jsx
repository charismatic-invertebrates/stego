var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({
  getInitialState: function() {
    return {
      commits: localStorage.commitCounts,
      dates: localStorage.commitDates,
      currentValue: this.getCurrentCommits()
    }
  },

  componentDidMount: function() {
    this.setState({
      commits: localStorage.commitCounts,
      dates: localStorage.commitDates,
      currentValue: this.getCurrentCommits()
    });
  },
  
  getCurrentCommits: function() {
    var commitsCount = 0;

    if (this.state !== null) {
      if (this.state.commits !== undefined) {
        var commitsList = this.state.commits.split(',');
        var datesList = this.state.dates.split(',');
        var today = this.props.startOfDay;

        for (var i = 0; i < commitsList.length; i++) {
          if (datesList[i] === today) {
            commitsCount = commitsList[i];
          }
        }
      }
    }

    return commitsCount;
  },

  shouldComponentUpdate: function() {
    if (localStorage.commitCounts !== this.state.commits) {
      this.setState({
        commits: localStorage.commitCounts,
        dates: localStorage.commitDates
      }, function() {
        this.setState({
          currentValue: this.getCurrentCommits()
        });
      });
    }

    return true;
  },
  
  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" currentValue={this.state.currentValue} max={this.props.max} />
      </div>
    );
  }

});

module.exports = CommitsBox;
