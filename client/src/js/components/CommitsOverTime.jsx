var React = require('react');

var CommitsOverTime = React.createClass({
  getInitialState: function() {
    return {
      chartData: this.getData()
    }
  },

  fillInDates: function(start, daysToAdd) {
    var newDay = new Date(start);
    newDay.setDate(newDay.getDate() + daysToAdd);
    
    var yyyy = newDay.getFullYear();
    var mm = newDay.getMonth() + 1;
    var dd = newDay.getDate();

    if (dd.length === 1) {
      dd = '0' + dd;
    }

    if (mm.length === 1) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
  },

  getData: function() {
    var weeklyCommits = this.props.user.github.weeklyCommits;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var startOfWeek = new Date(this.props.startOfWeek);

    var chartData = [
      { 'day': 'Sunday', 'date': this.fillInDates(startOfWeek, 0), 'commits': 0 },
      { 'day': 'Monday', 'date': this.fillInDates(startOfWeek, 1), 'commits': 0 },
      { 'day': 'Tuesday', 'date': this.fillInDates(startOfWeek, 2), 'commits': 0 },
      { 'day': 'Wednesday', 'date': this.fillInDates(startOfWeek, 3), 'commits': 0 },
      { 'day': 'Thursday', 'date': this.fillInDates(startOfWeek, 4), 'commits': 0 },
      { 'day': 'Friday', 'date': this.fillInDates(startOfWeek, 5), 'commits': 0 },
      { 'day': 'Saturday', 'date': this.fillInDates(startOfWeek, 6), 'commits': 0 }
    ];

    if (weeklyCommits.length) {

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
          for (var j = 0; j < chartData.length; j++) {
            if (chartData[j]['day'] === day) {
              chartData[j]['date'] = savedDate;
              chartData[j]['commits'] = 1;
            }
          }
        }
      });

    }

    return chartData;
  },

  drawChart: function() {
    this.setState({ chartData: this.getData() });
    //drawLineGraph(this.props.parentId, this.state.chartData, false);
  },

  updateChart: function() {
    this.setState({ chartData: this.getData() });
    updateLineGraph(this.props.parentId, this.state.chartData, true);
  },

  componentDidMount: function() {
    this.drawChart();
  },

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
