var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className='weather-container'>
        <div className='weather-forecast'>
          {this.props.currentWeather}
            <div className='test'>
              {this.props.more}
            </div>
        </div>
      </div>
    );
  }

});

module.exports = Weather;
