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
    
    // var yyyy = newDay.getFullYear();
    var mm = newDay.getMonth();
    var dd = newDay.getDate();

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    

/*    if (dd.length === 1) {
      dd = '0' + dd;
    }

    if (mm.length === 1) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
*/

    return months[mm] + ' ' + dd;
  },

  getData: function() {
    var commitsData = this.props.commitsData;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var startOfWeek = new Date(this.props.startOfWeek);

    var dates = [
      this.fillInDates(startOfWeek, 0),
      this.fillInDates(startOfWeek, 1),
      this.fillInDates(startOfWeek, 2),
      this.fillInDates(startOfWeek, 3),
      this.fillInDates(startOfWeek, 4),
      this.fillInDates(startOfWeek, 5),
      this.fillInDates(startOfWeek, 6)
    ];

/*    var chartData = [
      { 'day': 'Sunday', 'date': this.fillInDates(startOfWeek, 0), 'commits': 0 },
      { 'day': 'Monday', 'date': this.fillInDates(startOfWeek, 1), 'commits': 0 },
      { 'day': 'Tuesday', 'date': this.fillInDates(startOfWeek, 2), 'commits': 0 },
      { 'day': 'Wednesday', 'date': this.fillInDates(startOfWeek, 3), 'commits': 0 },
      { 'day': 'Thursday', 'date': this.fillInDates(startOfWeek, 4), 'commits': 0 },
      { 'day': 'Friday', 'date': this.fillInDates(startOfWeek, 5), 'commits': 0 },
      { 'day': 'Saturday', 'date': this.fillInDates(startOfWeek, 6), 'commits': 0 }
    ];
*/

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

    console.log(commitsData);

    for (var date in commitsData) {
      // Convert date to day
      var savedDate = date;
      var dayNumber = new Date(savedDate).getDay();
      var day = days[dayNumber];
      var data = chartData.datasets[0].data;

      for (var i = 0; i < data.length; i++) {
        if (i === dayNumber) {
          data[i] = commitsData[date];
        }
      }
    }

    return chartData;
  },

  drawChart: function(redraw) {
    this.setState({ chartData: this.getData() });
    drawLineGraph(this.props.parentId, this.state.chartData);
  },

  componentDidMount: function() {
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
      </div>
    );
  }
});

module.exports = CommitsOverTime;
