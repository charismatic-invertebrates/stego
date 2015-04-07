var React = require('react');
var Clock = require('./Clock.jsx');
var CommitsBox = require('./CommitsBox.jsx');
var StepsBox = require('./StepsBox.jsx');
var Dino = require('./Dino.jsx');

var Landscape = React.createClass({

  getInitialState: function() {
    var now = new Date().getHours();
    var timeOfDay;

    // wee hours of the morning and night
    // between 12:00 a.m. and 6:00 a.m.
    // or between 6:00 p.m. and 12:00 a.m.
    if (now >= 0 && now < 3) {
      timeOfDay = 'night';

    } else if (now >= 3 && now < 6) {
      timeOfDay = 'late-night';

    // morning for normal humans
    } else if (now >= 6 && now < 9) {
      timeOfDay = 'morning';

    } else if (now >= 9 && now < 12) {
      timeOfDay = 'late-morning';

    // afternoon
    } else if (now >= 12 && now < 15) {
      timeOfDay = 'afternoon';

    } else if (now >= 15 && now < 18) {
      timeOfDay = 'late-afternoon';

    } else if (now >= 18 && now < 21) {
      timeOfDay = 'evening';
    
    } else if (now >= 21 && now < 24) {
      timeOfDay = 'late-evening';
      
    }

    return {
      timeOfDay: timeOfDay
    }
  },

  render: function() {
    return (
      <div className={this.state.timeOfDay}>
        <StepsBox />
        <CommitsBox />
        <Clock />
        <Dino />
      </div>
    );
  }
});

module.exports = Landscape;
