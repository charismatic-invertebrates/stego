var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Clock = require('./Clock.jsx');
var CommitsBox = require('./CommitsBox.jsx');
var StepsBox = require('./StepsBox.jsx');
var Dino = require('./Dino.jsx');

var Landscape = React.createClass({

  getInitialState: function() {
    // this.props.auth.login('github');
    // this.props.auth.login('fitbit');
    // this.props.auth.login('jawbone');

    return {
      timeOfDay: this.checkTimeOfDay(new Date().getHours()),
      displayTime: this.checkDisplayTime(),
      meridian: this.checkMeridian(),
      switchScape: 'active'
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
    /*if (minutes === '00') {
      this.setState({timeOfDay: this.checkTimeOfDay(hour)});
    }*/

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
      meridian = 'p.m.';
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

  componentDidMount: function() {
    var el = React.findDOMNode(this.refs.lscape);
    setTimeout(function() {
      el.style.opacity = 1;
    }, 500);
    
    setInterval(function() {
      this.setState({timeOfDay: this.checkTimeOfDay()});
      this.setState({displayTime: this.checkDisplayTime()});
      this.setState({meridian: this.checkMeridian()});
    }.bind(this), 10000);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.timeOfDay !== this.state.timeOfDay) {
      var el = React.findDOMNode(this.refs.lscape);
      el.style.opacity = 0;
      setTimeout(function() {
        el.style.opacity = 1;
      }, 500);
    }

    return true;
  },

  render: function() {
    return (
      <div className={'time-of-day ' + this.state.timeOfDay} ref="lscape">
        <img src={'./images/landscape/sunmoon-'+ this.state.timeOfDay +'.png'} alt="" className={'sunmoon-'+this.state.timeOfDay}/>
        <div className={'landscape ' + this.state.timeOfDay}></div>
        <StepsBox auth={this.props.auth} user={this.props.userInfo} max={10000} />
        <CommitsBox auth={this.props.auth} user={this.props.userInfo} max={20} />
        <Clock parentTime={this.state.displayTime} parentMeridian={this.state.meridian} />
        <Dino steps={this.props.userInfo.fitness.moves} commits={this.props.userInfo.github.totalCommits} stepsMax={10000} commitsMax={20} />
      </div>
    );
  }
});

module.exports = Landscape;
