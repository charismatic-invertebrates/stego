// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      user: 'Fred',
      github: null,
      fitness: null
    };
  },

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape />
      </div>
    );
  }

});

React.render(<App/>, document.body);
