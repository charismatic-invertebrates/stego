// This is the App Component, it hosts App-wide resources.

var React = require('react');
var Landscape = require('./components/Landscape.jsx');
var Auth = require('./components/auth.jsx');

var App = React.createClass({

  getInitialState: function() {
    // Here we should check if there is already an existing user, and set the userInfo values as such.

    return {
      userInfo: {
        username: 'Fred',
        github: null,
        fitness: null
        },
      auth : Auth
    };
  },

  render: function() {
    return (
      <div id="landscape-container">
        <Landscape user={this.state.userInfo} auth={this.state.auth} />
      </div>
    );
  }

});

React.render(<App/>, document.body);
