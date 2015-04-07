var $ = require('jquery');
var React = require('react');

var Landscape = require('../components/Landscape.jsx');
var Clock = require('../components/Clock.jsx');

$(document.body).append('<div id="landscape-container"></div>');

React.render(<Landscape />, $('#landscape-container')[0]);