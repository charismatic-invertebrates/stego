var React = require('react');

var Clock = React.createClass({displayName: "Clock",

  render: function() {
    return (
      React.createElement("div", {className: "clock"}, 
        React.createElement("h1", null, 
          this.props.parentTime, 
          React.createElement("span", {className: "meridian"}, this.props.parentMeridian)
        )
      )
    );
  }

});

module.exports = Clock;
