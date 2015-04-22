var React = require('react');

var CommitsOverTime = React.createClass({
  getInitialState: function() {
    return {
      currentWeek: this.props.startOfWeek,
      chartData: this.getData()
    }
  },

  fillInDates: function(start, daysToAdd) {
    var newDay = new Date(start);
    newDay.setDate(newDay.getDate() + daysToAdd);
    
    var mm = newDay.getMonth();
    var dd = newDay.getDate();

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months[mm] + ' ' + dd;
  },

  getData: function(redraw) {
    var commitsData = this.props.commitsData;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var week;

    // Display current week by default
    if (this.state === null) {
      week = new Date(this.props.startOfWeek);
    } else {
      week = this.state.currentWeek;
    }

    var dates = [
      this.fillInDates(week, 0),
      this.fillInDates(week, 1),
      this.fillInDates(week, 2),
      this.fillInDates(week, 3),
      this.fillInDates(week, 4),
      this.fillInDates(week, 5),
      this.fillInDates(week, 6)
    ];

    var chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Commits',
          fillColor: 'rgba(23, 202, 173, 0.2)',
          strokeColor: 'rgb(23, 202, 173)',
          pointColor: 'rgb(23, 202, 173)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgb(23, 202, 173)',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

    for (var savedDate in commitsData) {
      // Convert date to day
      var date = new Date(savedDate);
      var dayNumber = date.getDay();
      var dateNumber = date.getDate();

      for (var i = 0; i < chartData.datasets[0].data.length; i++) {
        if (i === dayNumber) {
          if (chartData.labels[0].match(dateNumber) !== null) {
            chartData.datasets[0].data[i] = commitsData[date];
          }
        }
      }
    }

    // if (redraw) {
    //   return chartData.datasets[0].data;
    // } else {
      return chartData;
    // }
  },

  displayPreviousWeek: function() {
    var newWeek = new Date(this.state.currentWeek);

    // Set new week to start of previous week
    newWeek.setHours(-24 * 7);

    // Reset current week to new week and redraw chart
    this.setState({ currentWeek: newWeek }, function() {
      this.drawChart(true);
    });
  },

  displayNextWeek: function() {
    var newWeek = new Date(this.state.currentWeek);

    // Set new week to start of next week
    newWeek.setHours(24 * 7);

    // Reset current week to new week and redraw chart
    this.setState({ currentWeek: newWeek }, function() {
      this.drawChart(false);
    });
  },

  drawChart: function(redraw) {
    this.setState({ chartData: this.getData(redraw) }, function() {
      drawLineGraph(this.props.parentId, this.state.chartData, redraw);
    });

  },

  componentDidMount: function() {
    this.drawChart(false);
  },

  shouldComponentUpdate: function(nextProps) {
    if (this.props.commitsData !== undefined) {
      if (JSON.stringify(nextProps.commitsData) !== JSON.stringify(this.props.commitsData)) {
        this.drawChart();
      } 
    }

    return true;
  },

  render: function() {
    return (
      <div className="chart-container">
        <canvas className="line-chart" id={this.props.parentId}></canvas>
        <div className="nav-button-container">
          <a className="nav-button-left" onClick={this.displayPreviousWeek}>
            <span className="fa fa-caret-left icon"></span>
            Previous Week
          </a>
          <a className="nav-button-right" onClick={this.displayNextWeek}>
            Next Week
            <span className="fa fa-caret-right icon"></span>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = CommitsOverTime;
