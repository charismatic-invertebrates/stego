var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var CommitsPanel = React.createClass({

  togglePanel: function() {
    var panel = React.findDOMNode(this.refs.commitsPanel);
    var button = React.findDOMNode(this.refs.commitsPanelButton);

    console.log(panel.style.transform);

    if (panel.style.transform === 'translateX(500px)' || panel.style.transform === '') {
      panel.style.transform = 'translateX(0)';
      button.style.transform = 'translateX(-488px)';
    } else {
      panel.style.transform = 'translateX(500px)';
      button.style.transform = 'translateX(0)';
    }
  },

  render: function() {
    return (
      <div>
        <a className="button commits-panel-button" onClick={this.togglePanel} ref="commitsPanelButton">
          Commit History
        </a>
        <div className="commits-panel panel" ref="commitsPanel">
          <h2>{this.props.user.github.username}</h2>
        </div>
      </div>
    );
  }

});

module.exports = CommitsPanel;
