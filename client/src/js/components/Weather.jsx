var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className='weather-container'>
        <div className='weather-forecast'>
          {this.props.currentWeather}*C
          {this.props.something}
        </div>
      </div>
    );
  }

});

module.exports = Weather;
