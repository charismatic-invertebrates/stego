Chart.defaults.global.responsive = true;
Chart.defaults.global.tooltipFontFamily = "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";
Chart.defaults.global.tooltipFontSize = 12;
Chart.defaults.global.tooltipTitleFontFamily = "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";
Chart.defaults.global.tooltipTitleFontSize = 12;
Chart.defaults.global.animation = false;
Chart.defaults.global.scaleFontFamily = "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";

function drawLineGraph(elementId, data, redraw) {
  if (redraw) {
    console.log('redraw: ', data.labels);
    var canvas = document.getElementById(elementId);
    var container = canvas.parentNode;
    container.removeChild(canvas);
    var firstButton = container.firstChild;
    var newCanvas = document.createElement('canvas');
    newCanvas.id = elementId;
    newCanvas.className = 'line-chart';
    container.insertBefore(newCanvas, firstButton);
  }

  var ctx = document.getElementById(elementId).getContext('2d');
  var graph = new Chart(ctx).Line(data);
}
