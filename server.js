// Server-Side Entry Point
// -----------------------
//
var app = require('./server/serverSetup.js').app;

// This is where we set the port equal to the environment's variable when deployed, or to 8000 if on a localhost.
var port = process.env.PORT || 8000;

// Listen to port
app.listen(port);

console.log('Server is now listening on port ' + port);
