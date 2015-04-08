var React = require('react');

var Clock = React.createClass({

  render: function() {
    return (
      <div className="clock">
        <h1>
          {this.props.parentTime}
          <span className="meridian">{this.props.parentMeridian}</span>
        </h1>
      </div>
    );
  }

});

module.exports = Clock;
