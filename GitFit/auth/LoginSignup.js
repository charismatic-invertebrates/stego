'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  SliderIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '500',
    margin: 5
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 5,
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
    buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

var LoginSignup = React.createClass ({
  
  getInitialState() {
    return {
      value: 0,
    };
  },

  authenticateGithub: function() {
    console.log('Github Authentication here')
  },

  render: function() {
    console.log('rendering Login/Signup')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          GitFit
        </Text>
        <Text style={styles.text}>
          Commit to your fitness
        </Text>

        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.authenticateGithub.bind(this)}>
          <Text style={styles.buttonText}>Authenticate with Github</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.authenticateGithub.bind(this)}>
          <Text style={styles.buttonText}>Authenticate with Fitbit</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
});

module.exports = LoginSignup;
