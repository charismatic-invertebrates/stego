var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

  getInitialState: function(){
    return {
      commitsChart: this.generateChart()
    }
  },

  generateChart: function(){
    var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
    });
    console.log(chart);
    return chart;
  },

  render: function() {
    return (
      <div className="commits-box">
        <h2>Commits</h2>
        <Chart parentId="commits-chart" parentValue="50" />
      </div>
    );
  }

});

module.exports = CommitsBox;
