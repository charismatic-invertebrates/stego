var $ = require('jquery');
var React = require('react');

var App = require('./App.jsx');
var Landscape = require('../components/Landscape.jsx');

$(document.body).append('<div id="app"></div>');

React.render(<App />, document.getElementById('app'));
