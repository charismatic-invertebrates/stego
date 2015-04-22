// User-Server Model
// ----------
//
// The User-Server model contains the user's tokens.  This is separated from the regular User Schema so that it is not returned to the client.

var mongoose = require('mongoose');

// The user Schema:
var UserServerSchema = new mongoose.Schema({

  xid: String,
  reposUrl: String,
  githubUsername: String,
  provider: String,
  githubToken: String,
  fitnessToken: String,

});

module.exports = mongoose.model('UserServer', UserServerSchema);
