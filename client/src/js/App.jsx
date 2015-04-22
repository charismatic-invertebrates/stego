// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');
var auth = require('./stores/auth.js');
var SignInSplash = require('./components/SignInSplash.jsx');
var SignUpSplash = require('./components/SignUpSplash.jsx');
var Q = require('q');

var App = React.createClass({

  getInitialState: function() {
    return {
      // This property holds all user properties
      userInfo: {
        github: {
          name: null,
          username: null,
          reposUrl: null,
          repos: null,
          commitsByRepo: [],
          totalCommits: 0,
          token: null,
          code: null,
          weeklyCommits: [],
          dailyCommits: 0,
          commitsData: this.processCommits()
        },
        fitness: {
          provider: null,
          firstName: null,
          lastName: null,
          moves: 0,
          xid: null,
          code: null
        },
        fitbitHardcoded: {
          user: {"avatar":"http://www.fitbit.com/images/profile/defaultProfile_100_male.gif","avatar150":"http://www.fitbit.com/images/profile/defaultProfile_150_male.gif","country":"US","dateOfBirth":"2015-04-05","displayName":"Chad","distanceUnit":"en_US","encodedId":"3BRL27","foodsLocale":"en_US","fullName":"Chad Fong","gender":"MALE","glucoseUnit":"en_US","height":170,"heightUnit":"en_US","locale":"en_US","memberSince":"2015-04-02","offsetFromUTCMillis":-25200000,"startDayOfWeek":"SUNDAY","strideLengthRunning":88.4,"strideLengthWalking":70.60000000000001,"timezone":"America/Los_Angeles","topBadges":[{"badgeGradientEndColor":"00D3D6","badgeGradientStartColor":"007273","badgeType":"DAILY_STEPS","category":"Daily Steps","cheers":[],"dateTime":"2015-04-05","description":"15,000 steps in a day","earnedMessage":"Congrats on earning your first Urban Boot badge!","encodedId":"228TMK","image100px":"http://static0.fitbit.com/images/badges_new/100px/badge_daily_steps15k.png","image125px":"http://static0.fitbit.com/images/badges_new/125px/badge_daily_steps15k.png","image300px":"http://static0.fitbit.com/images/badges_new/300px/badge_daily_steps15k.png","image50px":"http://static0.fitbit.com/images/badges_new/badge_daily_steps15k.png","image75px":"http://static0.fitbit.com/images/badges_new/75px/badge_daily_steps15k.png","marketingDescription":"You've walked 15,000 steps  And earned the Urban Boot badge!","mobileDescription":"With a number that's almost three times more than the national average, your step count is really heating up.","name":"Urban Boot (15,000 steps in a day)","shareImage640px":"http://static0.fitbit.com/images/badges_new/386px/share/badge_daily_steps15k.png","shareText":"I took 15,000 steps and earned the Urban Boot badge! #Fitbit","shortDescription":"15,000 steps","shortName":"Urban Boot","timesAchieved":1,"value":15000},{"badgeGradientEndColor":"38D7FF","badgeGradientStartColor":"2DB4D7","badgeType":"LIFETIME_DISTANCE","category":"Lifetime Distance","cheers":[],"dateTime":"2015-04-08","description":"26 lifetime miles","earnedMessage":"Whoa! You've earned the Marathon badge!","encodedId":"22B8MB","image100px":"http://static0.fitbit.com/images/badges_new/100px/badge_lifetime_miles26_2.png","image125px":"http://static0.fitbit.com/images/badges_new/125px/badge_lifetime_miles26_2.png","image300px":"http://static0.fitbit.com/images/badges_new/300px/badge_lifetime_miles26_2.png","image50px":"http://static0.fitbit.com/images/badges_new/badge_lifetime_miles26_2.png","image75px":"http://static0.fitbit.com/images/badges_new/75px/badge_lifetime_miles26_2.png","marketingDescription":"By reaching 26 lifetime miles, you've earned the Marathon badge!","mobileDescription":"You've walked your way to your first lifetime miles badge. If this is just the starting line, we can't wait to see where you finish!","name":"Marathon (26 lifetime miles)","shareImage640px":"http://static0.fitbit.com/images/badges_new/386px/share/badge_lifetime_miles26_2.png","shareText":"I covered 26 miles with my #Fitbit and earned the Marathon badge.","shortDescription":"26 miles","shortName":"Marathon","timesAchieved":1,"unit":"MILES","value":26},{"badgeGradientEndColor":"38D7FF","badgeGradientStartColor":"2DB4D7","badgeType":"DAILY_FLOORS","category":"Daily Climb","cheers":[],"dateTime":"2015-04-08","description":"50 floors in a day","earnedMessage":"Congrats on earning your first Lighthouse badge!","encodedId":"228TT7","image100px":"http://static0.fitbit.com/images/badges_new/100px/badge_daily_floors50.png","image125px":"http://static0.fitbit.com/images/badges_new/125px/badge_daily_floors50.png","image300px":"http://static0.fitbit.com/images/badges_new/300px/badge_daily_floors50.png","image50px":"http://static0.fitbit.com/images/badges_new/badge_daily_floors50.png","image75px":"http://static0.fitbit.com/images/badges_new/75px/badge_daily_floors50.png","marketingDescription":"You've climbed 50 floors to earn the Lighthouse badge!","mobileDescription":"With a floor count this high, you're a beacon of inspiration to us all!","name":"Lighthouse (50 floors in a day)","shareImage640px":"http://static0.fitbit.com/images/badges_new/386px/share/badge_daily_floors50.png","shareText":"I climbed 50 flights of stairs and earned the Lighthouse badge! #Fitbit","shortDescription":"50 floors","shortName":"Lighthouse","timesAchieved":1,"value":50}],"waterUnit":"en_US","waterUnitName":"fl oz","weight":68,"weightUnit":"en_US"},
          activitiesByDate: {
            '2015-04-05': {"activities":[],"goals":{"activeMinutes":30,"caloriesOut":2184,"distance":8.05,"floors":10,"steps":10000},"summary":{"activeScore":-1,"activityCalories":1927,"caloriesBMR":1629,"caloriesOut":3262,"distances":[{"activity":"total","distance":13.51},{"activity":"tracker","distance":13.51},{"activity":"loggedActivities","distance":0},{"activity":"veryActive","distance":6.71},{"activity":"moderatelyActive","distance":1.54},{"activity":"lightlyActive","distance":5.24},{"activity":"sedentaryActive","distance":0}],"elevation":124.97,"fairlyActiveMinutes":30,"floors":41,"lightlyActiveMinutes":269,"marginalCalories":1225,"sedentaryMinutes":628,"steps":18254,"veryActiveMinutes":70}},
            '2015-04-06': {"activities":[],"goals":{"activeMinutes":30,"caloriesOut":2184,"distance":8.05,"floors":10,"steps":10000},"summary":{"activeScore":-1,"activityCalories":932,"caloriesBMR":1629,"caloriesOut":2448,"distances":[{"activity":"total","distance":4.74},{"activity":"tracker","distance":4.74},{"activity":"loggedActivities","distance":0},{"activity":"veryActive","distance":0.16},{"activity":"moderatelyActive","distance":0.19},{"activity":"lightlyActive","distance":4.4},{"activity":"sedentaryActive","distance":0}],"elevation":94.49,"fairlyActiveMinutes":7,"floors":31,"lightlyActiveMinutes":216,"marginalCalories":491,"sedentaryMinutes":836,"steps":6719,"veryActiveMinutes":3}},
            '2015-04-07': {"activities":[],"goals":{"activeMinutes":30,"caloriesOut":2184,"distance":8.05,"floors":10,"steps":10000},"summary":{"activeScore":-1,"activityCalories":913,"caloriesBMR":1629,"caloriesOut":2424,"distances":[{"activity":"total","distance":4.45},{"activity":"tracker","distance":4.45},{"activity":"loggedActivities","distance":0},{"activity":"veryActive","distance":0},{"activity":"moderatelyActive","distance":0},{"activity":"lightlyActive","distance":4.45},{"activity":"sedentaryActive","distance":0}],"elevation":42.67,"fairlyActiveMinutes":0,"floors":14,"lightlyActiveMinutes":219,"marginalCalories":496,"sedentaryMinutes":788,"steps":6308,"veryActiveMinutes":0}},
            '2015-04-08': {"activities":[],"goals":{"activeMinutes":30,"caloriesOut":2184,"distance":8.05,"floors":10,"steps":10000},"summary":{"activeScore":-1,"activityCalories":1482,"caloriesBMR":1629,"caloriesOut":2930,"distances":[{"activity":"total","distance":9.11},{"activity":"tracker","distance":9.11},{"activity":"loggedActivities","distance":0},{"activity":"veryActive","distance":4.47},{"activity":"moderatelyActive","distance":0.66},{"activity":"lightlyActive","distance":3.98},{"activity":"sedentaryActive","distance":0}],"elevation":170.69,"fairlyActiveMinutes":25,"floors":56,"lightlyActiveMinutes":231,"marginalCalories":906,"sedentaryMinutes":731,"steps":12121,"veryActiveMinutes":43}},
            '2015-04-09': {"activities":[],"goals":{"activeMinutes":30,"caloriesOut":2184,"distance":8.05,"floors":10,"steps":10000},"summary":{"activeScore":-1,"activityCalories":883,"caloriesBMR":1629,"caloriesOut":2453,"distances":[{"activity":"total","distance":4.22},{"activity":"tracker","distance":4.22},{"activity":"loggedActivities","distance":0},{"activity":"veryActive","distance":0.44},{"activity":"moderatelyActive","distance":0.37},{"activity":"lightlyActive","distance":3.4},{"activity":"sedentaryActive","distance":0}],"elevation":42.67,"fairlyActiveMinutes":11,"floors":14,"lightlyActiveMinutes":188,"marginalCalories":481,"sedentaryMinutes":844,"steps":5974,"veryActiveMinutes":6}}
          }
        }
      },
      day: this.setDay(),
      week: this.getStartOfWeek()
    };
  },

  // This binds the current 'this' context to auth.js.  This allows auth.js access to the 'this.state' variables.  We then invoke it, which returns the login, pair, and load functions required to run the app.  getParams and makeRequest and locked in the closuer scope.
  componentWillMount: function() {
    this.state.auth = auth.bind(this)();
  },

  componentDidMount: function() {
    this.setDay();
    this.getStartOfWeek();
  },

  processCommits: function() {
    var commitsData = {};

    var commits = localStorage.getItem('commitCounts');
    commits = commits !== null ? commits.split(',') : null;
    var dates = localStorage.getItem('commitDates');
    dates = dates !== null ? dates.split(',') : null;

    if(commits !== null) {
      commits.forEach(function(count, index) {
        commitsData[dates[index]] = parseInt(count,10);
      })
    }
    
    return commitsData;
  },

  // Convert date to current time zone
  convertTime: function(date) {
    // Time zone offset calculator from http://stackoverflow.com/a/28149561
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0,-1);

    return localISOTime.replace(/(T)?[0-9][0-9]:[0-9][0-9]:[0-9][0-9](\.[0-9][0-9][0-9])?/g, '');
  },

  // Find start of day
  setDay: function() {
    return this.convertTime(Date.now());
  },

  // Find start of week
  getStartOfWeek: function() {
    var date = new Date();

    // Start of week calculator from http://stackoverflow.com/a/4156562
    var day = date.getDay() || 6;

    // Only convert date if not Sunday
    if (day !== 0) {
      date.setHours(-24 * day);
    }

    return date;
  },

/*
  // Grab all commits that have occurred since the beginning of the week
        case 'github-commits-weekly':
          callParams = {
            url: 'https://api.github.com/repos/' + app.state.userInfo.github.username + '/' + param + '/commits?author=' + app.state.userInfo.github.username + '&since=' + app.convertTime(app.state.week),
            data: {access_token: app.state.userInfo.github.token},
            callback: function(commits) {
              commits.forEach(function(commitInfo) {
                // Isolate date (e.g., '2015-04-17')
                var currentDate = commitInfo.commit.committer.date.match(/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/)[0];

                updateState({
                  userInfo: {
                    github: {
                      weeklyCommits: {$push: [currentDate]}
                    }
                  }
                });
              });
            }
          };
          break;
*/

  render: function() {
    console.log(this.state.userInfo);
    return (
      <div id="landscape-container">
        <Landscape userInfo={this.state.userInfo} auth={this.state.auth} startOfWeek={this.state.week} startOfDay={this.state.day} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
