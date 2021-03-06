var React = require('react');
var Clock = require('./Clock.js');
var CommitsBox = require('./CommitsBox.js');
var StepsBox = require('./StepsBox.js');
var Dino = require('./Dino.js');

var Landscape = React.createClass({displayName: "Landscape",

  getInitialState: function() {
    return {
      timeOfDay: this.checkTimeOfDay(new Date().getHours()),
      displayTime: this.checkDisplayTime(),
      meridian: this.checkMeridian()
    }
  },

  checkDisplayTime: function() {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes().toString();

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    // check at the beginning of each hour that the correct background is displayed
    if (minutes === '00') {
      this.setState({timeOfDay: this.checkTimeOfDay(hour)});
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    return hour + ':' + minutes;
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

  checkTimeOfDay: function(hour) {
    var timeOfDay;

    // wee hours of the morning and night
    if (hour >= 0 && hour < 3) {
      timeOfDay = 'night';

    } else if (hour >= 3 && hour < 6) {
      timeOfDay = 'late-night';

    // morning for normal humans
    } else if (hour >= 6 && hour < 9) {
      timeOfDay = 'morning';

    } else if (hour >= 9 && hour < 12) {
      timeOfDay = 'late-morning';

    // afternoon
    } else if (hour >= 12 && hour < 15) {
      timeOfDay = 'afternoon';

    } else if (hour >= 15 && hour < 18) {
      timeOfDay = 'late-afternoon';

    } else if (hour >= 18 && hour < 21) {
      timeOfDay = 'evening';
    
    } else if (hour >= 21 && hour < 24) {
      timeOfDay = 'late-evening';
      
    }

    return timeOfDay;
  },

  componentDidMount: function() {
    setInterval(function() {
      this.setState({displayTime: this.checkDisplayTime()});
      this.setState({meridian: this.checkMeridian()});
    }.bind(this), 10000);
  },

  render: function() {
    return (
      React.createElement("div", {className: this.state.timeOfDay}, 
        React.createElement(StepsBox, {auth: this.props.auth, user: this.props.userInfo}), 
        React.createElement(CommitsBox, {auth: this.props.auth, user: this.props.userInfo}), 
        React.createElement(Clock, {parentTime: this.state.displayTime, parentMeridian: this.state.meridian}), 
        React.createElement(Dino, null)
      )
    );
  }
});

module.exports = Landscape;
