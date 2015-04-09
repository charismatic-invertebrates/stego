var React = require('react');
var Chart = require('./Chart.jsx');

var CommitsBox = React.createClass({

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
