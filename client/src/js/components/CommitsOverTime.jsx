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

  // getWeek: function() {
  //   return this.props.startOfWeek;
  // },

  getData: function() {
    var commitsData = this.props.commitsData;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var week;

    // Display current week by default
    if (this.state === null) {
      console.log('state is null')
      week = new Date(this.props.startOfWeek);
    } else {
      console.log('state is not null')
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

    console.log(dates);

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

    return chartData;
  },

  displayPreviousWeek: function() {
    var newWeek = new Date(this.state.currentWeek);

    // Set new week to start of previous week
    newWeek.setHours(-24 * 7);
    
    console.log('before state update: ', this.state.currentWeek);

    // Reset current week to new week and redraw chart
    this.setState({ currentWeek: newWeek });
    console.log('after state update: ', this.state.currentWeek);
    this.drawChart();
  },

  displayNextWeek: function() {
    var newWeek = new Date(this.state.currentWeek);

    // Set new week to start of next week
    newWeek.setHours(24 * 7);

    // Reset current week to new week and redraw chart
    this.setState({ currentWeek: newWeek });
    this.drawChart();
  },

  drawChart: function() {
    this.setState({ chartData: this.getData() });
    drawLineGraph(this.props.parentId, this.state.chartData);
  },

  componentDidMount: function() {
    console.log('state: ', this.state);
    this.drawChart();
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
