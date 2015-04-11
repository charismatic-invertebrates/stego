var React = require('react');

var Chart = React.createClass({
  drawChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    loadLiquidFillGauge(this.props.parentId, this.props.parentValue, config, false);
  },

  updateChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    loadLiquidFillGauge(this.props.parentId, this.props.parentValue, config, true);
  },

  componentDidMount: function() {
    this.drawChart();
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
