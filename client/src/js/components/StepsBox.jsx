var React = require('react');
var Chart = require('./Chart.jsx')

var StepsBox = React.createClass({

  render: function() {
    return (
      <div className="steps-box">
        <h2>Steps</h2>
        <Chart parentId="steps-chart" parentValue="80" />
      </div>
    );
  }

});

module.exports = StepsBox;
