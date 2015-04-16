function lineGraphDefaultSettings() {
  return {

  };
}

function drawLineGraph(elementId, data) {
  var graph = d3.select('#' + elementId);
  var width = graph.attr('width');
  var height = graph.attr('height');
  var parseDate = d3.time.format('%Y-%m-%d').parse;

  data.forEach(function(d) {
    console.log(d);
    d.date = parseDate(d.date);
  });

  // line generator
  var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.commits); });

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.sundays, 7)
    .tickFormat(d3.time.format('%A'));

  graph.append('g')
    .call(xAxis);

  graph.append('path')
    .datum(data)
    .attr('d', line);
}

function updateLineGraph(elementId) {
  
}

