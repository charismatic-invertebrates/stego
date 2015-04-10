var React = require('react');
var Chart = require('./Chart.jsx');

var StepsBox = React.createClass({

  loginUser: function(service) {
    this.props.auth.login(service);
  },

  logUser: function() {
    console.log(this.props.user);
  },

  render: function() {
    return (
      <div className="steps-box">
        <h2>Steps</h2>
        <Chart parentId="steps-chart" parentValue="80" />
        <div onClick={this.loginUser.bind(null, 'fitbit')}>Login to FitBit</div>
        <div onClick={this.loginUser.bind(null, 'jawbone')}>Login to Jawbone</div>
        <div onClick={this.logUser}>Console log user info</div>
      </div>
    );
  }

});

module.exports = StepsBox;
