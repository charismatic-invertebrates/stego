// Auth Controller
// ---------------
//
// The Auth controller handles requests passed from the User router.

var Q = require('q');
var request = require('request');
var keys = require('../config/secureAuth.js');
var $ = require('jquery');

var auth = {
  // This function assigns paramaters for an API request.
  assignReqParams: function(provider, usage, param){
    var call = provider + '-' + usage;
    var paramStore = {
      
      'github-getToken': {
        uri: 'https://github.com/login/oauth/access_token',
        method: 'GET',
        body: {
          code: param,
          'client_id': keys.github.clientID,
          'client_secret': keys.github.clientSecret
        },
        json: true
      },

      'github-getUser': {
        header: {
          'user-agent': 'GitFit',
          Authorization: 'token ' + param
        },
        url: 'https://api.github.com/user',
        callback: function(user) {
          console.log('come on down user:', user);
          // app.auth.makeRequest(provider, 'repos');
        }
      }
    };
    return paramStore[call];
  },

  // Save a new user in our database
  exchangeCode: function(req, res, next){
    var result = auth.assignReqParams(req.query.provider, 'getToken', req.query.code);
    auth.getRequest(result);
    //console.log('can i assignReqParams', result);
  },

  getRequest: function(param, cb){
    request(param, function(err, res, body){
      if(err) {
        console.log(err);
      } else {
        console.log('touch my body:', body);
        //do things
      }
    });

  },
    // request(options, function(err, res, body){
    //   if (err){ 
    //     console.log(err);
    //   } else {
    //     auth.get("", "",body.access_token);
        // console.log('body', body.access_token);
        // userOptions.body.access_token = body.access_token;
        // userOptions.header = {
        //   'User-Agent': 'GitFit',
        // "Authorization: token OAUTH-TOKEN" https://api.github.com
        // };
        // console.log('userOptions is', userOptions)
        // request(userOptions, function(err, res, body){
        //   if(err){
        //     console.log(err);
        //   } else {
        //     console.log('body', body);
        //   }
        // });

  //     }
  //   });
  // },

  get: function(provider, usage, param) {
    callParams = {
      header: {
        'user-agent': 'GitFit',
        Authorization: 'token ' + param
      },
      url: 'https://api.github.com/user',
      // options: {
      //   uri: 'https://github.com/login/oauth/access_token'
      //   },
      data: {
        access_token: param,
        // app.state.userInfo.github.token
      },
      callback: function(user) {
        console.log('callParams', callParams);
        // app.auth.makeRequest(provider, 'repos');
      }
    };
    // var callParams = setAJAXParams(provider, usage, param);
    request({
      type: 'GET',
      url: callParams.url,
      headers: callParams.header,
      // options: {
      //   uri: callParams.uri
      // },
      redirect_uri: 'http://localhost:8000',
      data: callParams.data
    }, function(err, res, body){ 
        if (err){
          console.log(err);
        } else {
          console.log('inside get req, the body is', body)
          callParams.callback(res);
        }
      }
    );
  },
  // saveUser: function(req, res, next) {
  //   var createUser = Q.nbind(User.create, User);
  //   console.log(req.body);
  //   var newUser = {
  //     githubID: req.body.githubID,
  //     fitbitID: req.body.fitbitID,
  //     jawboneID: req.body.jawboneID,
  //   };

  //   createUser(newUser)
  //     .then(function(createdUser) {
  //       if (createdUser) {
  //         res.json(createdUser);
  //       }
  //     })
  //     .fail(function(error) {
  //       next(error);
  //     });
  // }
};

module.exports = auth;