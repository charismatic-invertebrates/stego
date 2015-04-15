// User Model
// ----------
//
// The User model defines the structure of User documents. We use bcrypt to encrypt data before storage.

var mongoose = require('mongoose');

// The user Schema:
var UserSchema = new mongoose.Schema({

  xid: String,
  githubUsername: String,
  githubName: String,
  repos: String,
  commits: String,
  provider: String,
  steps: String,
  githubToken: String,
  fitnessToken: String,
  createdAt: {
    type: Date,
    default: Date.now 
  },


});

module.exports = mongoose.model('User', UserSchema);
