// Server-Side Helper Functions
// ----------------------------
//
// This file contains helper functions for logging and handling server-side errors.

module.exports = {

  // Log stack trace of errors from the server
  logErrors: function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  },

  // Send a 500 status code and an error message back to the client
  handleErrors: function(err, req, res, next) {
    res.send(500, {error: err.message});
  }
}
