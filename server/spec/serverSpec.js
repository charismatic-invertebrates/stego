var expect = require('chai').expect;
var request = require('supertest');
var app = require('../serverSetup.js').app;

describe('basic test', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
