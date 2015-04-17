function drawLineGraph(elementId, chartData, redraw) {
  var graph = d3.select('#' + elementId);
  var width = 300;
  var height = 300;
  var margin = {top: 40, right: 40, left: 40, bottom: 40};

  graph.attr('class', 'graph')
    .attr('width', width)
    .attr('height', height);

  // set ranges
  var xScale = d3.time.scale()
    .domain([new Date(chartData[0].date), d3.time.day.offset(new Date(chartData[chartData.length - 1].date), 1)])
    .rangeRound([0, width - margin.left - margin.right]);

  var yScale = d3.scale.linear()
    .domain([0, 20])
    .range([height - margin.top - margin.bottom, 0]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(d3.time.day.range, 1)
    .tickFormat(d3.time.format('%b %d'));

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

/*  // line generator
  var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d) { return xScale(new Date(d.date)); })
    .y(function(d) { return yScale(d.commits); });

  graph.selectAll('path')
    .data(chartData)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', line(chartData));
*/
  var svg = graph.selectAll('.chart')
    .data(chartData);

  svg.enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) { return xScale(new Date(d.date)) + (margin.left / 2); })
    .attr('y', function(d) { return height - yScale(d.commits); } )
    .attr('width', 20)
    .attr('height', function(d) { return height - yScale(d.commits); });

  svg.exit().remove();

  if (!redraw) {
    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(20,' + (height - margin.top) + ')')
      .call(xAxis);

    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(20,' + margin.top + ')')
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

