// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');
var auth = require('./stores/auth.js');
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
          token: null,
          code: null,
          commitsData: this.processData('commitCounts', 'commitDates')
        },
        fitness: {
          provider: null,
          firstName: null,
          lastName: null,
          moves: 0,
          xid: null,
          code: null,
          stepsData: this.processData('stepCounts', 'stepDates')
        },
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

  processData: function(count, date) {
    var data = {};

    var counts = localStorage.getItem(count);
    counts = counts !== null ? counts.split(',') : null;
    var dates = localStorage.getItem(date);
    dates = dates !== null ? dates.split(',') : null;

    if(counts !== null) {
      counts.forEach(function(count, index) {
        data[dates[index]] = parseInt(count,10);
      })
    }
    
    return data;
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

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape userInfo={this.state.userInfo} auth={this.state.auth} startOfWeek={this.state.week} startOfDay={this.state.day} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
