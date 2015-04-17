function drawLineGraph(elementId, chartData, redraw) {
  var graph = d3.select('#' + elementId);
  var width = 450;
  var height = 450;
  var margin = {top: 40, right: 40, left: 40, bottom: 40};

  // set ranges
  var xScale = d3.time.scale()
    .domain([new Date(chartData[0].date), d3.time.day.offset(new Date(chartData[chartData.length - 1].date), 1)])
    .rangeRound([0, width - margin.left - margin.right]);

  var yScale = d3.scale.linear()
    .domain([0, 20])
    .range([height - margin.top - margin.bottom, 0]);

  // line generator
  var line;

  if (!redraw) {
    graph.attr('class', 'graph')
      .attr('width', width)
      .attr('height', height);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(d3.time.day.range, 1)
      .tickFormat(d3.time.format('%b %d'));

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    line = d3.svg.line()
      .interpolate('basis')
      .x(function(d) { return xScale(new Date(d.date)); })
      .y(function(d) { return yScale(d.commits); });

    graph.append('path')
      .attr('class', 'line')
      .attr('transform', 'translate(' + margin.top + ',' + margin.left + ')')
      .attr('d', line(chartData));

    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + margin.left + ',' + (height - margin.top) + ')')
      .call(xAxis);

    graph.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(yAxis);

  } else {
    line = d3.svg.line()
      .interpolate('basis')
      .x(function(d) { return xScale(new Date(d.date)); })
      .y(function(d) { return yScale(d.commits); });
      
    graph.select('path')
      .attr('class', 'line')
      .attr('d', line(chartData));
  }
}
