var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Clock = require('./Clock.jsx');
var CommitsBox = require('./CommitsBox.jsx');
var StepsBox = require('./StepsBox.jsx');
var Dino = require('./Dino.jsx');
var CommitsPanel = require('./CommitsPanel.jsx');
var StepsPanel = require('./StepsPanel.jsx');
var Weather = require('./Weather.jsx');
var $ = require('jquery');
var Q = require('q');
var SignInSplash = require('./SignInSplash.jsx');
var SignUpSplash = require('./SignUpSplash.jsx');

var Landscape = React.createClass({

  getInitialState: function() {
    return {
      timeOfDay: this.checkTimeOfDay(new Date().getHours()),
      displayTime: this.checkDisplayTime(),
      meridian: this.checkMeridian(),
      displayWeather: '',
      weatherIcon: '',
      landscapeCounter: 0,
      moodCounter: 0,
      commits: this.props.userInfo.github.commitsData,
      steps: this.props.userInfo.fitness.moves
    };
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
    } else if (hour === 12) {
      this.setState({meridian: this.checkMeridian()});
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

  componentDidMount: function() {

    var el = React.findDOMNode(this.refs.lscape);
    setTimeout(function() {
      el.style.opacity = 1;
    }, 500);
    
    setInterval(function() {
      this.setState({displayTime: this.checkDisplayTime()});
    }.bind(this), 2000);
  
    // get the user's location and fetch weather data from OpenWeatherMap. Then update the displayWeather property to allow the child component to display the information.
    navigator.geolocation.getCurrentPosition(function(geolocation){
      var lon = geolocation.coords.longitude;
      var lat = geolocation.coords.latitude;
      
      $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial", 
        function(result) {
          var temperature = Math.round(result.main.temp) + '\xB0';
          var iconNum = result['weather'][0]['id'].toString();
          var skycons = new Skycons({"color": "white"});
          var hour = new Date().getHours();
          var dayOrNight;

          // calculate what time of day it is
          if (hour >= 6 && hour <= 19) {
            dayOrNight = 'day';
          } else {
            dayOrNight = 'night';
          }

          // assign weather icon based on the current weather
          if (iconNum === '800' && dayOrNight === 'day') {
            skycons.add("skycon", Skycons.CLEAR_DAY);
          } else if (iconNum === '800' && dayOrNight === 'night'){
            skycons.add("skycon", Skycons.CLEAR_NIGHT);
          } else if (iconNum === '801' && dayOrNight === 'day') {
            skycons.add("skycon", Skycons.PARTLY_CLOUDY_DAY);
          } else if (iconNum === '801' && dayOrNight === 'night') {
            skycons.add("skycon", Skycons.PARTLY_CLOUDY_NIGHT);
          } else if (iconNum[0] ==='8') {
            skycons.add("skycon", Skycons.CLOUDY);
          } else if (iconNum[0] === '2') {
            skycons.add("skycon", Skycons.RAIN);
          } else if (iconNum[0] === '3') {
            skycons.add("skycon", Skycons.RAIN);
          } else if (iconNum[0] === '5') {
            skycons.add("skycon", Skycons.RAIN);
          } else if (iconNum[0] === '6') {
            skycons.add("skycon", Skycons.SNOW);
          } else if (iconNum[0] === '9') {
            skycons.add("skycon", Skycons.SLEET);
            // intentionally blank. There is no matching icon, so attach no icon in that case.
          } else {

          }

          if (this.isMounted()) {
            this.setState({
              displayWeather: temperature,
              weatherIcon: iconNum
            });
          }
        }.bind(this)
      );
    }.bind(this));
  },

  changeLandscape: function() {
    var landscapes = ['dawn', 'morning', 'afternoon', 'evening', 'night', 'latenight'];

    this.setState({ timeOfDay: landscapes[this.state.landscapeCounter] }, function() {
      if (this.state.landscapeCounter === landscapes.length - 1) {
        this.setState({ landscapeCounter: 0 });
      } else {
        this.setState({ landscapeCounter: this.state.landscapeCounter + 1 });
      }
    });
  },
  
  changeMood: function() {
    var demoCommits = [6, 24];
    var demoSteps = [8015, 35400];
    this.setState({
      commits: demoCommits[this.state.moodCounter],
      steps: demoSteps[this.state.moodCounter]
     }, function() {
      if (this.state.moodCounter === demoCommits.length - 1) {
        this.setState({ moodCounter: 0 });
      } else {
        this.setState({ moodCounter: this.state.moodCounter + 1 });
      }
    });
  },

  render: function() {
        // <SignUpSplash auth={this.props.auth} />
        // <SignInSplash auth={this.props.auth} />

    return (
      <div className={'time-of-day ' + this.state.timeOfDay}>
        <img src="./images/landscape/clouds-1.png" alt="" className="clouds cloud-1"/>
        <img src="./images/landscape/clouds-2.png" alt="" className="clouds cloud-2"/>
        <img src="./images/landscape/clouds-3.png" alt="" className="clouds cloud-3"/>
        <img src="./images/landscape/clouds-4.png" alt="" className="clouds cloud-4"/>
        <img src="./images/landscape/clouds-5.png" alt="" className="clouds cloud-5"/>
        <img src={'./images/landscape/sunmoon-'+ this.state.timeOfDay +'.png'} alt="" className={'sunmoon-'+this.state.timeOfDay}/>
        <div className={'landscape ' + this.state.timeOfDay}></div>
        <StepsBox auth={this.props.auth} steps={this.state.steps} max={10000}/>
        <StepsPanel auth={this.props.auth} user={this.props.userInfo} startOfWeek={this.props.startOfWeek} max={10000} />
        <CommitsBox auth={this.props.auth} commits={this.state.commits} startOfDay={this.props.startOfDay} max={10} />
        <CommitsPanel auth={this.props.auth} user={this.props.userInfo} startOfWeek={this.props.startOfWeek} max={10} />
        <Clock parentTime={this.state.displayTime} parentMeridian={this.state.meridian} />
        <Dino steps={this.state.steps} commits={this.state.commits} stepsMax={10000} commitsMax={10} />
        <Weather currentWeather={this.state.displayWeather} />

        <div className="admin">
          <a className="admin-button" onClick={this.changeLandscape}>
            <span className="fa fa-clock-o"></span>
          </a>
          <a className="admin-button" onClick={this.changeMood}>
            <span className="fa fa-smile-o"></span>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Landscape;

