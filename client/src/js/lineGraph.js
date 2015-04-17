function lineGraphDefaultSettings() {
  return {

  };
}

function drawLineGraph(elementId, chartData, redraw) {
  var graph = d3.select('#' + elementId);
  var width = 300;
  var height = 300;
  var parseDate = d3.time.format('%Y-%m-%d').parse;
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  chartData.forEach(function(d) {
    d.date = parseDate(d.date);
    d.commits = +d.commits;
  });

  // set ranges
  var xScale = d3.time.scale().range([0, width])
    .domain(d3.extent(chartData, function(d) { return d.date; }));
  var yScale = d3.scale.linear().range([height, 0]).domain([0, 20]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(function(d, i) { return days[i]; });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  // line generator
  var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.commits); });

  graph.selectAll('path')
    .data(chartData)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', line(chartData));

  if (!redraw) {
    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(20,' + height + ')')
      .call(xAxis);

    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(20, 0)')
      .call(yAxis);
  }
}

function updateLineGraph(elementId, chartData) {
  var graph = d3.select('#' + elementId);
  var width = 300;
  var height = 300;
  var parseDate = d3.time.format('%Y-%m-%d').parse;

  chartData.forEach(function(d) {
    d.date = parseDate(d.date);
    d.commits = +d.commits;
  });

  // line generator
  var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.commits); });

  var paths = graph.selectAll('path')
    .data(chartData);

  paths.attr('class', 'update');

  paths.enter().append('path')
    .attr('class', 'line')
    .attr('d', line(chartData));

  paths.exit().remove();
}

