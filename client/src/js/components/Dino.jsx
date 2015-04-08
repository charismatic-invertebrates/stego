var React = require('react');

var Dino = React.createClass({

  render: function() {
    return (
      <div className="dino-container">
        <div className="stego-body">
          <div className="eye left-eye animated rubberband infinite"></div>
          <div className="eye right-eye animated rubberband infinite"></div>
          <div className="mouth"></div>
          <div className="left-arm animated hinge"></div>
          <div className="right-arm"></div>
          <div className="left-leg"></div>
          <div className="right-leg"></div>
          <div className="tail"></div>
        </div>

      </div>
    );
  }

});

module.exports = Dino;
