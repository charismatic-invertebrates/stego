var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className='weather-container'>
        <div className='weather-forecast'>
          {this.props.currentWeather}
          <canvas id="skycon"></canvas>
          {this.props.more}
        </div>
      </div>
    );
  }

});

module.exports = Weather;
