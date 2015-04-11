var React = require('react');

var Chart = React.createClass({
  drawChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    config.maxValue = this.props.maxValue;
    loadLiquidFillGauge(this.props.parentId, this.props.currentValue, config, false);
  },

  updateChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    config.maxValue = this.props.maxValue;
    loadLiquidFillGauge(this.props.parentId, this.props.currentValue, config, true);
  },

  shouldComponentUpdate: function() {
    this.updateChart();
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

module.exports = Chart;
