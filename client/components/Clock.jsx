var React = require('react');

var Clock = React.createClass({

  getInitialState: function() {
    return {
      time: this.checkTime()
    };
  },

  checkTime: function() {
    var now = new Date();
    var hour = now.getHours() - 12;
    var minutes = now.getMinutes();

    return hour + ':' + minutes;
  },

  componentDidMount: function() {
    setInterval(function() {
      this.setState({time: this.checkTime()});
    }.bind(this), 60000);
  },

  render: function() {
    return (
      <div className="clock">
        <h1>{this.state.time}</h1>
      </div>
    );
  }

});

module.exports = Clock;
