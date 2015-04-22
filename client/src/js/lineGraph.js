function drawLineGraph(elementId, data, redraw) {
  if (redraw) {
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
