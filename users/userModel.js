// User Model
// ----------
//
// The User model defines the structure of User documents.

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  githubID: String,
  avatar: {
    type: String,
    name: String
  }
});

module.exports = mongoose.model('User', UserSchema);
