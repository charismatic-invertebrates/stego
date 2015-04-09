var React = require('react');

var Chart = React.createClass({

  componentDidMount: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    loadLiquidFillGauge(this.props.parentId, this.props.parentValue, config);
  },

  render: function() {
    return (
      <div className="chart-container">
        <svg className="chart" id={this.props.parentId}></svg>
      </div>
    );
  }

});

module.exports = Chart;
