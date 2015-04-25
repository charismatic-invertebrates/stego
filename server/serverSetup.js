// Server Setup
// -----------------------
//
// Configure express server, and open portal with Mongoose to connect with MongoDB Database

var express = require('express');
var mongoose = require('mongoose');

// Create Express server on app variable
var app = express();

// Configure MongoDB connection depending on environment. If deployed, it will be using the process.env variable, and if not it will be on localhost:27017/gitfit.
mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/gitfit';
mongoose.connect(mongoURI);

// Log the status of the database connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('MongoDB connection is now open');
});

// Connect server with routers defined in middleware
require('./config/middleware.js')(app, express);

// Export the MongoDB and Exprss connections
module.exports.app = app;
module.exports.db = db;
