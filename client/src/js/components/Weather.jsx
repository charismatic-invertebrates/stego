var React = require('react');

var Weather = React.createClass({

  render: function() {
    return (
      <div className="weather-forecast">
        <h1>
          //{this.props.parentTime}
        </h1>
      </div>
    );
  }

});

module.exports = Weather;
