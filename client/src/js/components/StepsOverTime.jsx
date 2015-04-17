var React = require('react');

var StepsOverTime = React.createClass({
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
    var startOfWeek = new Date(this.props.startOfWeek);

    var chartData = [
      { 'day': 'Sunday', 'date': this.fillInDates(startOfWeek, 0), 'steps': 0 },
      { 'day': 'Monday', 'date': this.fillInDates(startOfWeek, 1), 'steps': 0 },
      { 'day': 'Tuesday', 'date': this.fillInDates(startOfWeek, 2), 'steps': 0 },
      { 'day': 'Wednesday', 'date': this.fillInDates(startOfWeek, 3), 'steps': 0 },
      { 'day': 'Thursday', 'date': this.fillInDates(startOfWeek, 4), 'steps': 0 },
      { 'day': 'Friday', 'date': this.fillInDates(startOfWeek, 5), 'steps': 0 },
      { 'day': 'Saturday', 'date': this.fillInDates(startOfWeek, 6), 'steps': 0 }
    ];

    return chartData;
  },

  drawChart: function(redraw) {
    this.setState({ chartData: this.getData() });
    drawLineGraph(this.props.parentId, this.state.chartData, this.props.max, 'steps', redraw);
  },

  componentDidMount: function() {
    this.drawChart(false);
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.user.github.weeklyCommits.length !== this.props.user.github.weeklyCommits.length) {
      this.drawChart(true);
    }

    return true;
  },

  render: function() {
    return (
      <div className="chart-container">
        <svg className="line-chart" id={this.props.parentId}></svg>
      </div>
    );
  }
});

module.exports = StepsOverTime;
