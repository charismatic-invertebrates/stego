// Server-Side Middleware
// ----------------------

// The middleware connects the Express app with Express routers and configures the app to use additional modules, including body-parser and morgan.

// POST request body parsing
var bodyParser = require('body-parser');
// Client request logging 
var morgan = require('morgan');

module.exports = function(app, express) {

  // Create Express routers for each route
  var userRouter = express.Router();
  var commitRouter = express.Router();
  var stepRouter = express.Router();



}