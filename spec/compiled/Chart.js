var React = require('react');

var Chart = React.createClass({displayName: "Chart",

  componentDidMount: function() {
    var el = React.findDOMNode(this);
    var config = liquidFillGaugeDefaultSettings();
    loadLiquidFillGauge(this.props.parentId, this.props.parentValue, config);
  },

  render: function() {
    return (
      React.createElement("div", {className: "chart-container"}, 
        React.createElement("svg", {className: "chart", id: this.props.parentId})
      )
    );
  }

});

module.exports = Chart;
