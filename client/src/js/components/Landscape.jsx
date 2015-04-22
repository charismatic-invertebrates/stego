var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Clock = require('./Clock.jsx');
var CommitsBox = require('./CommitsBox.jsx');
var StepsBox = require('./StepsBox.jsx');
var Dino = require('./Dino.jsx');
var CommitsPanel = require('./CommitsPanel.jsx');
var StepsPanel = require('./StepsPanel.jsx');

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
        <img src="./images/landscape/clouds-1.png" alt="" className="clouds cloud-1"/>
        <img src="./images/landscape/clouds-2.png" alt="" className="clouds cloud-2"/>
        <img src="./images/landscape/clouds-3.png" alt="" className="clouds cloud-3"/>
        <img src="./images/landscape/clouds-4.png" alt="" className="clouds cloud-4"/>
        <img src="./images/landscape/clouds-5.png" alt="" className="clouds cloud-5"/>
        <img src={'./images/landscape/sunmoon-'+ this.state.timeOfDay +'.png'} alt="" className={'sunmoon-'+this.state.timeOfDay}/>
        <div className={'landscape ' + this.state.timeOfDay}></div>
        <StepsBox auth={this.props.auth} user={this.props.userInfo} max={10000} />
        <StepsPanel auth={this.props.auth} user={this.props.userInfo} startOfWeek={this.props.startOfWeek} max={10000} />
        <CommitsBox auth={this.props.auth} commits={this.props.userInfo.github.commitsData} startOfDay={this.props.startOfDay} max={20} />
        <CommitsPanel auth={this.props.auth} user={this.props.userInfo} startOfWeek={this.props.startOfWeek} max={20} />
        <Clock parentTime={this.state.displayTime} parentMeridian={this.state.meridian} />
        <Dino steps={this.props.userInfo.fitness.moves} commits={this.props.userInfo.github.dailyCommits} stepsMax={10000} commitsMax={20} />
      </div>
    );
  }
});

module.exports = Landscape;
