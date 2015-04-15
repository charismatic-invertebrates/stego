function lineGraphDefaultSettings() {
  return {

  };
}

function drawLineGraph(elementId) {
  var graph = d3.select('#' + elementId);
  var width = graph.attr('width');
  var height = graph.attr('height');

  // line generator
//   var line = d3.svg.line()
//     .interpolate('basis')
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.price); });
// }

// function lines(width, height) {
  var x = d3.time.scale().range([0, width - 60]);
  var y = d3.scale.linear().range([height / 4 - 20, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.sundays, 7)
    .tickFormat(d3.time.format('%A'));

  graph.append('g')
    .attr('fill', '#1ff')
    .call(xAxis);
}

function updateLineGraph(elementId) {
  
}

