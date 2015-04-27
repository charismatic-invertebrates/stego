var React = require('react');

var Dino = React.createClass({

  getInitialState: function() {
    return {
      mood: this.checkMood(),
      moodCounter: 0
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

  changeMood: function() {
    var moods = ['neutral', 'happy', 'sad'];
    this.setState({
      mood: moods[this.state.moodCounter]
    }, function() {
      if (this.state.moodCounter === moods.length - 1) {
        this.setState({ moodCounter: 0 });
      } else {
        this.setState({ moodCounter: this.state.moodCounter + 1 });
      }
    });

  },

  render: function() {
    return (
      <div>
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

        <a className="admin-button admin-mood" onClick={this.changeMood}>
          <span className="fa fa-smile-o"></span>
        </a>
      </div>
    );
  }

});

module.exports = Dino;
