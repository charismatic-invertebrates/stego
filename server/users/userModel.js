// User Model
// ----------
//
// The User model defines the structure of User documents. We use bcrypt to encrypt data before storage.

var mongoose = require('mongoose');

// The user Schema:
var UserSchema = new mongoose.Schema({

  githubID: String,
  githubToken: String,
  
  fitbitID: String,
  fitbitToken: String,
  
  jawboneID: String,
  jawboneToken: String,
  
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);
