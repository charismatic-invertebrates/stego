/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 */
function liquidFillGaugeDefaultSettings(){
  return {
    minValue: 0, // The gauge minimum value.
    maxValue: 100, // The gauge maximum value.
    circleThickness: 0.02, // The outer circle thickness as a percentage of its radius.
    circleFillGap: 0, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    // circleBorderColor: '#178BCA', // The color of the outer circle.
    // circleColor: 'rgba(23, 139, 202, 0.5)',
    circleBorderColor: 'rgb(23, 202, 173)',
    circleColor: 'rgba(23, 202, 173, 0.3)',
    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 3, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to its final height.
    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to its full height, or start at its full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches its maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near its minimum or maximum fill.
    waveAnimate: false, // Controls if the wave scrolls or is static.
    waveColor: '#178BCA', // The color of the fill wave.
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: false, // If true, the displayed value counts up from 0 to its final value upon loading. If false, the final value is displayed.
    displayPercent: false, // If true, a % symbol is displayed after the value.
    textColor: '#fff', // The color of the value text when the wave does not overlap it.
    waveTextColor: '#A4DBf8' // The color of the value text when the wave overlaps it.
  };
}

function loadLiquidFillGauge(elementId, value, config, redraw) {
  if(config === null) config = liquidFillGaugeDefaultSettings();

  var gauge = d3.select('#' + elementId);
  var radius = Math.min(parseInt(gauge.style('width')), parseInt(gauge.style('height')))/2;
  var locationX = parseInt(gauge.style('width'))/2 - radius;
  var locationY = parseInt(gauge.style('height'))/2 - radius;
  var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;

  var waveHeightScale;

  if(config.waveHeightScaling){
    waveHeightScale = d3.scale.linear()
      .range([0,config.waveHeight,0])
      .domain([0,50,100]);
  } else {
    waveHeightScale = d3.scale.linear()
      .range([config.waveHeight,config.waveHeight])
      .domain([0,100]);
  }

  var textPixels = (config.textSize*radius/2);
  // var percentText = config.displayPercent?'%':'';
  var circleThickness = config.circleThickness * radius;
  var circleFillGap = config.circleFillGap * radius;
  var fillCircleMargin = circleThickness + circleFillGap;
  var fillCircleRadius = radius - fillCircleMargin;
  var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
  var waveLength = fillCircleRadius*2/config.waveCount;
  var waveClipCount = 1+config.waveCount;
  var waveClipWidth = waveLength*waveClipCount;

  // Data for building the clip wave area.
  var data = [];
  for(var i = 0; i <= 40*waveClipCount; i++){
      data.push({x: i/(40*waveClipCount), y: (i/(40))});
  }

  // Scales for controlling the size of the clipping path.
  var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
  var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);

  // Scales for controlling the position of the clipping path.
  var waveRiseScale = d3.scale.linear()
    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
    // such that the it will won't overlap the fill circle at all when at 0%, and will totally cover the fill
    // circle at 100%.
    .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
    .domain([0,1]);
  var waveAnimateScale = d3.scale.linear()
    .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
    .domain([0,1]);

  // Scale for controlling the position of the text within the gauge.
  var textRiseScaleY = d3.scale.linear()
    .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
    .domain([0,1]);

  // The clipping wave area.
  var clipArea = d3.svg.area()
    .x(function(d) { return waveScaleX(d.x); } )
    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
    .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
  
  var gaugeGroup;
  var waveGroup;
  var wave;
  var fillCircleGroup;

  if (redraw) {
    // Center the gauge within the parent SVG.
    gaugeGroup = gauge.select('g')
      .attr('transform','translate('+locationX+','+locationY+')');

    gaugeGroup.select('#clipWave' + elementId).remove();
    gaugeGroup.select('defs').remove();
    gaugeGroup.select('g').attr('clip-path', 'url(#clipWave' + elementId + ')').remove();
    gaugeGroup.select('text').remove();

  } else {
    // Scales for drawing the outer circle.
    var gaugeCircleX = d3.scale.linear().range([0,2*Math.PI]).domain([0,1]);
    var gaugeCircleY = d3.scale.linear().range([0,radius]).domain([0,radius]);

    // Center the gauge within the parent SVG.
    gaugeGroup = gauge.append('g')
      .attr('transform','translate('+locationX+','+locationY+')');

    // Draw the outer circle.
    var gaugeCircleArc = d3.svg.arc()
      .startAngle(gaugeCircleX(0))
      .endAngle(gaugeCircleX(1))
      .outerRadius(gaugeCircleY(radius))
      .innerRadius(0)
      // .innerRadius(gaugeCircleY(radius-circleThickness));

    gaugeGroup.append('path')
      .attr('d', gaugeCircleArc)
      .style('fill', config.circleColor)
      .style('stroke', config.circleBorderColor)
      .style('stroke-width', '4px')
      .attr('transform','translate('+radius+','+radius+')');

  }

  waveGroup = gaugeGroup.append('defs')
    .append('clipPath')
    .attr('id', 'clipWave' + elementId);
  wave = waveGroup.append('path')
    .datum(data)
    .attr('d', clipArea);

  // The inner circle with the clipping wave attached.
  fillCircleGroup = gaugeGroup.append('g')
      .attr('clip-path', 'url(#clipWave' + elementId + ')');
  fillCircleGroup.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', fillCircleRadius)
      .style('fill', config.waveColor);

  gaugeGroup.append('text')
    .text(value)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', textPixels + 'px')
    .style('fill', config.textColor)
    .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

  // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
  var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
  
  if(config.waveRise){
    waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
      .transition()
      .duration(config.waveRiseTime)
      .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
      .each('start', function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
  } else {
    waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
  }

  if(config.waveAnimate) animateWave();

  function animateWave() {
    wave.transition()
      .duration(config.waveAnimateTime)
      .ease('linear')
      .attr('transform','translate('+waveAnimateScale(1)+',0)')
      .each('end', function(){
          wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
          animateWave(config.waveAnimateTime);
      });
  }
}
