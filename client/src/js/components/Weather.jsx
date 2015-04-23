var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className="weather-container">
        <canvas id="skycon"></canvas>
        <p className="weather-degrees">{this.props.currentWeather}</p>
        {this.props.more}
      </div>
    );
  }

});

module.exports = Weather;
