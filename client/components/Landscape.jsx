var $ = require('jquery');
var React = require('react');

var Landscape = React.createClass({

  getInitialState: function() {
    var now = new Date().getHours();
    var timeOfDay;

    // wee hours of the morning and night
    // between 12:00 a.m. and 6:00 a.m.
    // or between 6:00 p.m. and 12:00 a.m.
    if ((now >= 0 && now < 6) || (now >= 18 && now <= 24)) {
      timeOfDay = 'night';

    // morning for normal humans
    } else if (now >= 6 && now < 12) {
      timeOfDay = 'morning';

    // afternoon
    } else if (now >= 12 && now < 18) {
      timeOfDay = 'afternoon';
    }

    return {
      timeOfDay: timeOfDay
    }
  },

  render: function() {
    return (
      <div className={this.state.timeOfDay}>
        <h1>Good {this.state.timeOfDay}</h1>
      </div>
    );
  }
});

module.exports = Landscape;
