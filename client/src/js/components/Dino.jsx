var React = require('react');

var Dino = React.createClass({

  getInitialState: function() {
    return {
      mood: this.checkMood()
    }
  },

  checkMood: function() {
    var currentMood;
    var commits = this.props.commits;
    var steps = this.props.steps;
    var commitsMax = this.props.commitsMax;
    var stepsMax = this.props.stepsMax;

    if (commits < (commitsMax / 2) || steps < (stepsMax / 2)) {
      currentMood = 'sad';
    } else if (commits >= commitsMax || steps >= stepsMax) {
      currentMood = 'happy';
    } else {
      currentMood = 'neutral';
    }

    return 'neutral';
  },

  componentDidMount: function() {
    this.setState({mood: this.checkMood()});
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.commits !== this.props.commits ||
      nextProps.steps !== this.props.steps) {
      this.setState({mood: this.checkMood()});
    }

    return true;
  },

  render: function() {
    return (
      <div className="stego-container">
        <div className="stego-body-wrapper">
          <div className={'stego-body ' + this.state.mood}></div>
          <div className={"eye left-eye "+ this.state.mood}></div>
          <div className={"eye right-eye "+ this.state.mood}></div>
          <div className={"mouth "+ this.state.mood}></div>
          <div className={"teeth "+ this.state.mood}></div>
          <div className={"left-arm " + this.state.mood}></div>
          <div className={"right-arm " + this.state.mood}></div>
          <div className="left-leg"></div>
          <div className={"tear " + this.state.mood}></div>
          <div className="right-leg"></div>
          <div className={"tail " + this.state.mood}></div>
        </div>
      </div>
    );
  }

});

module.exports = Dino;
