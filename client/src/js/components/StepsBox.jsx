var React = require('react');
var Chart = require('./Chart.jsx');

var StepsBox = React.createClass({

  getProviderCode: function(service, loginServer) {
    this.props.auth.getCode(service, loginServer);
  },

  logUser: function() {
    console.log(this.props.user);
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.steps !== this.props.steps) {
      this.setState({ currentValue: this.props.steps });
    }

    return true;
  },
  
  render: function() {
    return (
      <div className="steps-box">
        <h2>Steps</h2>
        <Chart parentId="steps-chart" currentValue={this.props.steps} max={this.props.max} />
      </div>
    );
  }

});

module.exports = StepsBox;
