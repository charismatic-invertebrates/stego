var React = require('react');

var Clock = React.createClass({

  getInitialState: function() {
    return {
      time: this.checkTime(),
      meridian: this.checkMeridian()
    };
  },

  checkTime: function() {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes().toString();

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    return (hour - 12) + ':' + minutes;
  },

  checkMeridian: function() {
    var now = new Date();
    var hour = now.getHours();
    var meridian;

    if (hour < 12) {
      meridian = 'a.m.';
    } else {
      meridian = 'p.m.'
    }

    return meridian;    
  },

  componentDidMount: function() {
    setInterval(function() {
      this.setState({time: this.checkTime()});
      this.setState({meridian: this.checkMeridian()});
    }.bind(this), 60000);
  },

  render: function() {
    return (
      <div className="clock">
        <h1>
          {this.state.time}
          <span className="meridian">{this.state.meridian}</span>
        </h1>
      </div>
    );
  }

});

module.exports = Clock;
