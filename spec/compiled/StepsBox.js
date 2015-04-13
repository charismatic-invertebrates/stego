var React = require('react');
var Chart = require('./Chart.js');

var StepsBox = React.createClass({displayName: "StepsBox",

  loginUser: function(service) {
    this.props.auth.login(service);
  },

  render: function() {
    return (
      React.createElement("div", {className: "steps-box"}, 
        React.createElement("h2", null, "Steps"), 
        React.createElement(Chart, {parentId: "steps-chart", parentValue: "80"}), 
        React.createElement("div", {onClick: this.loginUser.bind(null, 'fitbit')}, "Login to FitBit"), 
        React.createElement("div", {onClick: this.loginUser.bind(null, 'jawbone')}, "Login to Jawbone"), 
        React.createElement("div", null, "Console log user info")
      )
    );
  }

});

module.exports = StepsBox;
