var React = require('react');

var WeeklyChart = React.createClass({
  getInitialState: function() {
    return {
      currentWeek: this.props.startOfWeek,
      metric: localStorage[this.props.storageType + 'Counts'],
      dates: localStorage[this.props.storageType + 'Dates'],
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
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
          label: this.props.label,
          fillColor: 'rgba(255, 189, 82, 0.2)',
          strokeColor: 'rgba(140, 234, 102, 0.5)',
          pointColor: 'rgb(140, 234, 102)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgb(140, 234, 102)',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };


    if (this.state !== null) {
      if (this.state.metric !== undefined) {
        var metricList = this.state.metric.split(',');
        var datesList = this.state.dates.split(',');

        for (var i = 0; i < metricList.length; i++) {
          // Convert date to day
          var date = new Date(datesList[i]);
          var dayNumber = date.getUTCDay();
          var dateNumber = date.getUTCDate();

          for (var j = 0; j < chartData.datasets[0].data.length; j++) {
            if (j === dayNumber) {
              if (chartData.labels[j].match(dateNumber) !== null) {
                chartData.datasets[0].data[j] = parseInt(metricList[i], 10);
              }
            }
          }
        }
      }
    }

    return chartData;
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
      this.drawChart(true);
    });
  },

  drawChart: function(redraw) {
    this.setState({ chartData: this.getData(redraw) }, function() {
      var data = this.state.chartData;
      drawLineGraph(this.props.parentId, data, redraw);
    });
  },

  componentDidMount: function() {
    this.setState({
      metric: localStorage[this.props.storageType + 'Counts'],
      dates: localStorage[this.props.storageType + 'Dates'],
      currentValue: this.getData()
    }, function() {
      this.drawChart(false);
    });
  },

  shouldComponentUpdate: function() {
    if (localStorage[this.props.storageType + 'Counts'] !== this.state.metric) {
      this.setState({
        metric: localStorage[this.props.storageType + 'Counts'],
        dates: localStorage[this.props.storageType + 'Dates']
      }, function() {
        this.setState({
          chartData: this.getData()
        }, function() {
          this.drawChart(true);
        });
      });
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

module.exports = WeeklyChart;
