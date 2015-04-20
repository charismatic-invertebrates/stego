var React = require('react');
var Chart = require('./Chart.jsx');

var StepsBox = React.createClass({

  getProviderCode: function(service, skipPairing) {
    this.props.auth.getCode(service, skipPairing);
  },

  logUser: function() {
    console.log(this.props.user);
  },
  
  render: function() {
    return (
      <div className="steps-box">
        <h2>Steps</h2>
        <Chart parentId="steps-chart" currentValue={this.props.user.fitness.moves} max={this.props.max} />
        <a className="button" onClick={this.getProviderCode.bind(null, 'fitbit')}>Login to FitBit</a>
        <a className="button" onClick={this.getProviderCode.bind(null, 'jawbone')}>Login to Jawbone</a>
        <a className="button" onClick={this.logUser}>Console log user info</a>
        <a className="button" onClick={this.getProviderCode.bind(null, 'github', 'checkServer')}>Login to Pre-existing Account</a>
        <a className="button" onClick={this.logUser}>Sync database with APIs</a>
      </div>
    );
  }

});

module.exports = StepsBox;
