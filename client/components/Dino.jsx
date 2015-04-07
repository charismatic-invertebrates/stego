var React = require('react');

var Dino = React.createClass({

  getInitialState: function() {
    return {
      dino: this.checkDino()
    }
  },

  checkDino: function() {
    return '../images/critter-default.png';
  },

  render: function() {
    return (
      <div className="dino-container">
        <img src={this.checkDino()} className="dino" />
      </div>
    );
  }

});

module.exports = Dino;
