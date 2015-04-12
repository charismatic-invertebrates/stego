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
<<<<<<< HEAD
        <Chart parentId="steps-chart" currentValue={16000} maxValue={30000} />
=======
        <Chart parentId="steps-chart" currentValue={8000} maxValue={10000} />
>>>>>>> 70dfe95c3966e48239f75c507ec33fb87c48a7e3
        <a className="button" onClick={this.loginUser.bind(null, 'fitbit')}>Login to FitBit</a>
        <a className="button" onClick={this.loginUser.bind(null, 'jawbone')}>Login to Jawbone</a>
        <a className="button" onClick={this.logUser}>Console log user info</a>
      </div>
    );
  }

});

module.exports = StepsBox;
