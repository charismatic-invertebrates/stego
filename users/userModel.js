// User Model
// ----------
//
// The User model defines the structure of User documents.

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

});

module.exports = mongoose.model('users', UserSchema);
