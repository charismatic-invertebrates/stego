var React = require('react/addons');
var CommitsOverTime = require('./CommitsOverTime.jsx');

var CommitsPanel = React.createClass({

  togglePanel: function() {
    var panel = React.findDOMNode(this.refs.commitsPanel);
    var button = React.findDOMNode(this.refs.commitsPanelButton);

    if (panel.style.transform === 'translateX(500px)' || panel.style.transform === '') {
      panel.style.transform = 'translateX(0)';
      button.style.transform = 'translateX(-416px)';
      button.innerHTML = 'Close';
    } else {
      panel.style.transform = 'translateX(500px)';
      button.style.transform = 'translateX(0)';
      button.innerHTML = 'Commits Progress';
    }
  },

  render: function() {
    return (
      <div className="panel-container">
        <a className="panel-button commits-panel-button" onClick={this.togglePanel} ref="commitsPanelButton">
          Commits Progress
        </a>
        <div className="panel commits-panel" ref="commitsPanel">
          <h3>Weekly Commits</h3>
          <CommitsOverTime commitsData={this.props.user.github.commitsData} startOfWeek={this.props.startOfWeek} max={this.props.max} parentId="commits-over-time" />
        </div>
      </div>
    );
  }

});

module.exports = CommitsPanel;
