var React = require('react');

var Chart = React.createClass({
  drawChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    config.maxValue = this.props.max;

    if (this.props.currentValue < (config.maxValue / 2)) {
      config.waveColor = 'rgba(213, 0, 94, 0.5)';
    }

    loadLiquidFillGauge(this.props.parentId, this.props.currentValue, config, false);
  },

  updateChart: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    config.maxValue = this.props.max;
    
    if (this.props.currentValue < (config.maxValue / 2)) {
      config.waveColor = 'rgba(213, 0, 94, 0.5)';
    }

    loadLiquidFillGauge(this.props.parentId, this.props.currentValue, config, true);
  },

  componentDidMount: function() {
    this.drawChart();
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.currentValue !== this.props.currentValue) {
      this.updateChart();
    }

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
