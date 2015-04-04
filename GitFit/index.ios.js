// Index Page for React Native App
//________________________________

// Strict mode is used in all React Native code.  It tweaks runtime Javascript making it more secure, and causes it to throw errors where non-strict would pass an issue along.  Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

// Require statements pulling in React Native, and other files to use.
var React = require('react-native');
var LoginSignup = require('./auth/LoginSignup.js')

// Destructuring Assignment (Available in ECMAScript 6).  What is placed in the initial var {} become references to their value on the Object they are set equal to.  E.g., var {Text} = React; --> We are setting Text = React.Text allowing us to set many variables to their values on an object.  Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// This is the view that we are creating
var GitFit = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Login/Signup',
          component: LoginSignup,
        }}
      />
    );
  }
});

// These are the styles for the tags on this page.  Note that Stylesheet refers to React.Stylesheet due to the destructing assignment from before.  These styles mimic, but are not actually CSS.
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Registers the Component to be run on iOS.
AppRegistry.registerComponent('GitFit', () => GitFit);
