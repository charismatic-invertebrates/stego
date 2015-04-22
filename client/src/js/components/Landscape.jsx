var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Clock = require('./Clock.jsx');
var CommitsBox = require('./CommitsBox.jsx');
var StepsBox = require('./StepsBox.jsx');
var Dino = require('./Dino.jsx');
var CommitsPanel = require('./CommitsPanel.jsx');
var StepsPanel = require('./StepsPanel.jsx');
var SignInSplash = require('./SignInSplash.jsx');
var SignUpSplash = require('./SignUpSplash.jsx');

var Landscape = React.createClass({

  getInitialState: function() {
    return {
      timeOfDay: this.checkTimeOfDay(new Date().getHours()),
      displayTime: this.checkDisplayTime(),
      meridian: this.checkMeridian(),
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
      meridian = 'AM';
    } else {
      meridian = 'PM';
    }

    return meridian;    
  },

  checkTimeOfDay: function(hour) {
    var timeOfDay;

    // wee hours of the morning and night
    if (hour >= 0 && hour < 4) {
      timeOfDay = 'latenight';

    } else if (hour >= 4 && hour < 8) {
      timeOfDay = 'dawn';

    // morning for normal humans
    } else if (hour >= 8 && hour < 12) {
      timeOfDay = 'morning';

    } else if (hour >= 12 && hour < 16) {
      timeOfDay = 'afternoon';

    // afternoon
    } else if (hour >= 16 && hour < 20) {
      timeOfDay = 'evening';

    } else if (hour >= 20 && hour < 24) {
      timeOfDay = 'night';

    }

    return timeOfDay;
  },

  render: function() {
    return (
      <div className={'time-of-day ' + this.state.timeOfDay} ref="lscape">
        <img src={'./client/dist/public/images/landscape/sunmoon-'+ this.state.timeOfDay +'.png'} alt="" className={'sunmoon-'+this.state.timeOfDay}/>
        <div className={'landscape ' + this.state.timeOfDay}></div>
        <Dino steps={this.props.userInfo.fitness.moves} commits={this.props.userInfo.github.dailyCommits} stepsMax={10000} commitsMax={20} />
      </div>
    );
  }
});

module.exports = Landscape;
