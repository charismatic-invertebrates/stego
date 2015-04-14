// This is the App Component, it hosts App-wide resources.

var React = require('react/addons');
var Landscape = require('./components/Landscape.jsx');
var keys = require('../../../server/config/secureAuth.js');
var $ = require('jquery');

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
          code: null
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
      day: this.setDay()
    };
  },
  
  // This is a faux-IIFE for auth so that auth can save the 'this' context.  A regular IIFE statement does not render the correct context.
  componentWillMount: function(){
    this.auth = this.auth();
  },

  componentDidMount: function() {
    this.setDay();
  },

  setDay: function() {
    // Time zone offset calculator from http://stackoverflow.com/a/28149561
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

    var startOfDay = localISOTime.replace(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/g, '00:00:00');
    // var startOfDayAbbr = startOfDay.replace(/T00:00:00\.[0-9]+/, '');

    return startOfDay;
  },

  // This property holds all Authentication logic, it holds app and setAJAXParams in closure scope.
  auth: function(){

    // We set 'app' to 'this' so that we can access this.state within different contexts.    
    var app = this;

    // Set AJAXParams inputs a provider and task and returns an object which our AJAX calls use to set their options.
    var setAJAXParams = function(provider, usage, param) {
      var callLoc = provider + '-' + usage;
      var updateState = function(update) {
        app.setState(React.addons.update(app.state, update));
      };

      // This switch statement sets all properties necessary to make an AJAX call.  This allows us to create one AJAX call, and make different calls depending on provider.
      switch(callLoc) {
        case 'github-login':
          callParams = {
            url: 'https://github.com/login/oauth/authorize?client_id=' + keys.github.clientID,
            callback: function(code) {
              console.log('in login');
              updateState({
                userInfo: {github: {
                  code: {$set: code}
                }}
              });
            }
          };
          break;
        case 'github-getToken':
          callParams = {
            url: 'http://localhost:8000/api/auth/getToken/',
            data: {
              code: param,
              provider: 'github'
              // client_id : keys.github.clientID,
              // client_secret : keys.github.clientSecret
            },
            // redirect_uri: 'https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/githubToken',
            callback: function(res){
              var token = res.match(/(?:access_token=)[a-zA-Z0-9]+/g)[0].split('access_token=')[1];
              updateState({ 
                userInfo: {github: {token: {$set: token} } } 
              });
              console.log('User info saved after login: ', app.state.userInfo);

                // We need to refactor this call to work with all APIs
              app.auth.makeRequest(provider, 'user'); 
            }
          };
          break;
        case 'github-user':
          callParams = {
            url: 'https://api.github.com/user',
            data: {access_token: app.state.userInfo.github.token},
            callback: function(user) {
              updateState({
                userInfo: {github: {
                  name: {$set: user.name},
                  username: {$set: user.login},
                  reposUrl: {$set: user.repos_url}
                }}
              });

              app.auth.makeRequest(provider, 'repos');
            }
          };
          break;
        case 'github-repos': 
          callParams = {
            url: app.state.userInfo.github.reposUrl,
            data: {access_token: app.state.userInfo.github.token},
            callback: function(repos){
              var reposList = [];
              
              repos.forEach(function(repo) {
                reposList.push(repo.name);
              });
              updateState({
                userInfo: {github: {
                  repos: {$set: reposList}
                }}
              });
              // console.log('Saved user repos: ', reposList);
              // console.log('Confirm via log User');

              app.state.userInfo.github.repos.forEach(function(repo) {
                app.auth.makeRequest('github', 'commits', repo);
              });
            }
          };
          break;
        case 'github-commits':
          callParams = {
            url: 'https://api.github.com/repos/' + app.state.userInfo.github.username + '/' + param + '/commits?author=' + app.state.userInfo.github.username + '&since=' + app.state.day,
            data: {access_token: app.state.userInfo.github.token},
            callback: function(commits) {
              commits.forEach(function(commitInfo) {
                updateState({
                  userInfo: {github: {
                    commitsByRepo: {$push: [{repo: param, stats: commitInfo}]},
                    totalCommits: {$set: app.state.userInfo.github.totalCommits + 1}
                  }}
                });
              });
            }
          };
          break;

        case 'fitbit-login':
          callParams = {
            url: 'https://api.fitbit.com/oauth/request_token?oauth_callback=https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/fitbit&oauth_consumer_key=' + keys.fitbit.consumerKey
          };
          break;

        case 'jawbone-login':
          callParams = {
            url: 'https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=' + keys.jawbone.clientID + '&scope=move_read&redirect_uri=https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/jawbone',
            callback: function(code) {
              console.log('in login');
              updateState({
                userInfo: {fitness: {
                  provider: {$set: provider},
                  code: {$set: code}
                }}
              });
            }
          };
          break;
        case 'jawbone-getToken':
          callParams = {
            url: 'https://jawbone.com/auth/oauth2/token',
            data: {
              client_id: keys.jawbone.clientID,
              client_secret: keys.jawbone.clientSecret,
              grant_type: 'authorization_code',
              code: param,
            },
            callback: function(res) {
              var token = res.access_token;
              app.setState(React.addons.update(app.state, {
                userInfo: {fitness: {token: {$set: token} } }
              }));
              console.log(res);
              console.log('saved userInfo: ', app.state.userInfo.fitness);
              app.auth.makeRequest(provider, 'user');
            },
          };
          break;
        case 'jawbone-user':
          callParams = {
            url: 'https://jawbone.com/nudge/api/v.1.1/users/@me',
            header: {'Authorization': 'Bearer ' + app.state.userInfo.fitness.token},  
            callback: function(res){
              updateState({
                userInfo: {fitness: {
                  firstName: {$set: res.data.first},
                  lastName: {$set: res.data.last},
                  xid: {$set: res.data.xid}
                }}
              });
              app.auth.makeRequest('jawbone', 'moves');
            }
          };
          break;
        case 'jawbone-moves':
          callParams = {
            url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves',
            header: {'Authorization': 'Bearer ' + app.state.userInfo.fitness.token},  
            callback: function(res){
              console.log(res);
              updateState({
                userInfo: {fitness: {
                  moves: {$set: res.data},
                }}
              });
            }
          };
          break;
        case 'paired-getTokens':
        callParams = {
          url: 'http://localhost:8000/api/auth/getToken/',
          data: {
            code: param,
            provider: 'github'
            // client_id : keys.github.clientID,
            // client_secret : keys.github.clientSecret
          },
          // redirect_uri: 'https://eihfnhkmggidbojcjcgdjpjkhlbhealk.chromiumapp.org/githubToken',
          callback: function(res){
            var token = res.match(/(?:access_token=)[a-zA-Z0-9]+/g)[0].split('access_token=')[1];
            updateState({ 
              userInfo: {github: {token: {$set: token} } } 
            });
            console.log('User info saved after login: ', app.state.userInfo);

              // We need to refactor this call to work with all APIs
            app.auth.makeRequest(provider, 'user'); 
          }
        };
        break;
      }
      return callParams;
    };

    return {
      // This function is modularized to handle all Login requests for all APIs
      login: function(provider) {
        var callParams = setAJAXParams(provider, 'login');
        // console.log('Ajax call with params: ', callParams); 

        chrome.identity.launchWebAuthFlow({
          'url': callParams.url,
          'interactive': true
          },
          function(redirectUrl) {
            var user = app.state.userInfo;
            var code = redirectUrl.split('?code=')[1];
            callParams.callback(code);
            if( user.fitness.code === null || user.github.code === null ) {
              console.log('authenticate with both providers please');
            }
          }
        );
      },

      pairAccounts: function(){
        var user = app.state.userInfo;
        if( user.fitness.code === null || user.github.code === null ) {
          console.log('authenticate with both providers please');
        } else {
          var accounts = {
            github: {
              code: user.github.code
            },
            fitness: {
              provider: user.fitness.provider,
              code: user.fitness.code
            }
          }
          app.auth.makeRequest('paired', 'getTokens', accounts);
        }
      },
      
      // This function is modularized to make all GET requests for all APIs
      makeRequest: function(provider, usage, param) {
        var callParams = setAJAXParams(provider, usage, param);
        $.ajax({
          type: 'GET',
          url: callParams.url,
          headers: callParams.header,
          data: callParams.data,
          success: function(res) {
            callParams.callback(res);
          },
          fail: function(err) {
            console.error('GET request failed: ', err);
          }
        });
      },

      // This function is modularized to make all POST requests for all APIs
      postRequest: function(provider, usage, param) {
        var callParams = setAJAXParams(provider, usage, param);
        $.ajax({
          type: 'POST',
          url: callParams.url,
          data: callParams.data,
          redirect_uri: callParams.redirect_uri,
          success: function(res) {
            console.log('POST response: ', res);
            callParams.callback(res);
          },
          fail: function(err) {
            console.error('POST request failed: ', err);
          }
        });

      }
    };
  },

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape userInfo={this.state.userInfo} auth={this.auth} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
