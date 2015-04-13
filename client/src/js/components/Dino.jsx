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

    return currentMood;
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
        <div className={'stego-body ' + this.state.mood}>
          <div className="eye left-eye"></div>
          <div className="eye right-eye"></div>
          <div className="mouth"></div>
          <div className="left-arm"></div>
          <div className="right-arm"></div>
          <div className="left-leg"></div>
          <div className="right-leg"></div>
          <div className="tail"></div>
        </div>
      </div>
    );
  }

});

module.exports = Dino;
