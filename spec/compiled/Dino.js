var React = require('react');

var Dino = React.createClass({displayName: "Dino",

  render: function() {
    return (
      React.createElement("div", {className: "dino-container"}, 
        React.createElement("div", {className: "stego-body"}, 
          React.createElement("div", {className: "eye left-eye"}), 
          React.createElement("div", {className: "eye right-eye"}), 
          React.createElement("div", {className: "mouth"}), 
          React.createElement("div", {className: "left-arm animated hinge"}), 
          React.createElement("div", {className: "right-arm"}), 
          React.createElement("div", {className: "left-leg"}), 
          React.createElement("div", {className: "right-leg"}), 
          React.createElement("div", {className: "tail"})
        )

      )
    );
  }

});

module.exports = Dino;
