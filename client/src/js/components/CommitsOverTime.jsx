var React = require('react');

var CommitsOverTime = React.createClass({

  drawChart: function() {
    var chartData = [];
    var weeklyCommits = this.props.user.github.weeklyCommits;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (weeklyCommits.length > 0) {
      weeklyCommits.forEach(function(savedDate) {
        // convert date to day
        var dayNumber = new Date(savedDate).getDay();
        var day = days[dayNumber];
        var found = false;

        for (var i = 0; i < chartData.length; i++) {
          if (chartData[i]['date'] === savedDate) {
            found = true;
            chartData[i]['commits'] += 1;
          }
        }

        if (!found) {
          chartData.push({
            'date': savedDate,
            'day': day,
            'commits': 1
          });
        }
      });

      drawLineGraph(this.props.parentId, chartData);
    }

  },

  updateChart: function() {
    var el = React.findDOMNode(this);
    var config = lineGraphDefaultSettings();
    config.maxValue = this.props.max;
    
    updateLineGraph(this.props.parentId, this.props.currentValue);
  },

  // componentDidMount: function() {
  // },

  // componentDidUpdate: function() {
  //   this.drawChart();
  // },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.user.github.weeklyCommits.length !== this.props.user.github.weeklyCommits.length) {
      this.drawChart();
    }

    return true;
  },

  render: function() {
    return (
      <div className="chart-container">
        <svg className="chart" id={this.props.parentId}></svg>
      </div>
    );
  }
});

module.exports = CommitsOverTime;
