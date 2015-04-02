// Server-Side Middleware
// ----------------------

// This middleware file connects the Express app with Express routers and configures the app to use additional modules, including body-parser and morgan.

// POST request body parsing middleware
var bodyParser = require('body-parser');
// HTTP request logger middleware
var morgan = require('morgan');
// Helper functions for error logging and handling
var helpers = require('./helpers.js');

module.exports = function(app, express) {

  // Create Express routers for each route
  var userRouter = express.Router();
  var commitRouter = express.Router();
  var stepRouter = express.Router();

  // Configure Express app to use additional modules
  // bodyParser.urlencoded() returns middleware that parses only UTF-8 encoded bodies. The option "extended: true" indicates that the qs library should be used to parse the URL-encoded data and allows for the encoding of rich objects and arrays.
  app.use(bodyParser.urlencoded({extended: true}));
  // bodyParser.json() returns middleware that parses only JSON.
  app.use(bodyParser.json());
  // morgan('dev') creates a logger with output colored by response status for development use.
  app.use(morgan('dev'));
  // helpers.logErrors() logs errors from the server - see ./helpers.js.
  app.use(helpers.logErrors);
  // helpers.handleErrors() sends errors back to the client - see ./helpers.js.
  app.use(helpers.handleErrors);

  // Use the user router for all user requests
  app.use('/api/users', userRouter);
  // Use the commit router for all commit requests
  app.use('/api/commits', commitRouter);
  // Use the step router for all step requests
  app.use('/api/steps', stepRouter);

  // Inject Express routers into route files
  require('../users/userRoutes.js');
  require('../commits/commitRoutes.js');
  require('../commits/stepRoutes.js');
}