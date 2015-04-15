var React = require('react');

var CommitsOverTime = React.createClass({
  // getData: function() {
  //   return {

  //   }
  // },

  drawChart: function() {
    var el = React.findDOMNode(this);
    // var config = lineGraphDefaultSettings();
    // config.maxValue = this.props.max;

    var data = [];
    var weeklyCommits = this.props.user.github.weeklyCommits;

    weeklyCommits.forEach(function(savedDate) {
      data.push({
        'date': new Date(savedDate.getDay())
      });
    });

/*    // for each repository
    weeklyCommits.forEach(function(repository) {
      // for each stats object in repo
      repository.stats.forEach(function(stat) {
        // if current week is not yet in object
        // add it to object with number of corresponding commits
        if (allWeeksStats[stat.w] === undefined) {
          // console.log(stat.w, stat.c)
          allWeeksStats[stat.w] = 0;
        }
        // else add corresponding commits to current week in object
        allWeeksStats[stat.w] += stat.c;
      });
    });

    console.log(allWeeksStats);
*/
    // drawLineGraph(this.props.parentId, this.props.currentValue);
  },

  updateChart: function() {
    var el = React.findDOMNode(this);
    var config = lineGraphDefaultSettings();
    config.maxValue = this.props.max;
    
    updateLineGraph(this.props.parentId, this.props.currentValue);
  },

  componentDidMount: function() {
  },

  componentDidUpdate: function() {
    this.drawChart();
  },

  // shouldComponentUpdate: function(nextProps) {
  //   if (nextProps.user.github.weeklyCommits !== this.props.user.github.weeklyCommits) {
  //     this.drawChart();
  //   }

  //   return true;
  // },

  render: function() {
    return (
      <div className="chart-container">
        <svg className="chart" id={this.props.parentId}></svg>
      </div>
    );
  }
});

module.exports = CommitsOverTime;
