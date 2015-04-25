var React = require('react');
var Chart = require('./Chart.jsx');

var Box = React.createClass({
  getInitialState: function() {
    return {
      metric: localStorage[this.props.storageType + 'Counts'],
      dates: localStorage[this.props.storageType + 'Dates'],
      currentValue: this.getCurrent()
    }
  },

  componentDidMount: function() {
    this.setState({
      metric: localStorage[this.props.storageType + 'Counts'],
      dates: localStorage[this.props.storageType + 'Dates'],
      currentValue: this.getCurrent()
    });
  },
  
  getCurrent: function() {
    var metricCount = 0;

    if (this.state !== null) {
      if (this.state.metric !== undefined) {
        var metricList = this.state.metric.split(',');
        var datesList = this.state.dates.split(',');
        var today = this.props.startOfDay;

        for (var i = 0; i < metricList.length; i++) {
          if (datesList[i] === today) {
            metricCount = metricList[i];
          }
        }
      }
    }

    return metricCount;
  },

  shouldComponentUpdate: function() {
    if (localStorage[this.props.storageType + 'Counts'] !== this.state.metric) {
      this.setState({
        metric: localStorage[this.props.storageType + 'Counts'],
        dates: localStorage[this.props.storageType + 'Dates']
      }, function() {
        this.setState({
          currentValue: this.getCurrent()
        });
      });
    }

    return true;
  },
  
  render: function() {
    return (
      <div className={this.props.storageType + 's-box'}>
        <h2>{this.props.title}</h2>
        <Chart parentId={this.props.storageType + 's-chart'} currentValue={this.state.currentValue} max={this.props.max} />
      </div>
    );
  }

});

module.exports = Box;
