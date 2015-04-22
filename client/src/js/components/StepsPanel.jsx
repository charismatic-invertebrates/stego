var React = require('react/addons');
var StepsOverTime = require('./StepsOverTime.jsx');

var StepsPanel = React.createClass({

  togglePanel: function() {
    var panel = React.findDOMNode(this.refs.stepsPanel);
    var button = React.findDOMNode(this.refs.stepsPanelButton);

    if (panel.style.transform === 'translateX(-500px)' || panel.style.transform === '') {
      panel.style.transform = 'translateX(0)';
      button.style.transform = 'translateX(416px)';
      button.innerHTML = 'Close';
    } else {
      panel.style.transform = 'translateX(-500px)';
      button.style.transform = 'translateX(0)';
      button.innerHTML = 'Steps Progress';
    }
  },

  render: function() {
    return (
      <div>
        <a className="panel-button steps-panel-button" onClick={this.togglePanel} ref="stepsPanelButton">
          Steps Progress
        </a>
        <div className="panel steps-panel" ref="stepsPanel">
          <h3>Weekly Steps</h3>
          <StepsOverTime steps={this.props.user.fitness.moves} startOfWeek={this.props.startOfWeek} max={this.props.max} parentId="steps-over-time" />
        </div>
      </div>
    );
  }
});

module.exports = StepsPanel;
