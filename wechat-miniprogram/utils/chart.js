var chartModule = {
  initChart: function(canvasId, page) {
    if (!canvasId || !page) {
      console.error('Chart init failed: missing canvasId or page');
      return null;
    }
    
    var context = null;
    try {
      context = wx.createCanvasContext(canvasId, page);
    } catch (e) {
      console.error('Canvas context error:', e);
      return null;
    }
    
    return {
      context: context,
      setOption: function(option) {
        if (!option || !context) return;
        
        var ctx = context;
        var width = 320;
        var height = 320;
        
        var padding = {
          left: 50,
          right: 20,
          top: 20,
          bottom: 40
        };
        
        var chartWidth = width - padding.left - padding.right;
        var chartHeight = height - padding.top - padding.bottom;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.setStrokeStyle('#E8EBF0');
        ctx.setLineWidth(1);
        var gridCount = 5;
        for (var i = 0; i <= gridCount; i++) {
          var y = padding.top + (chartHeight / gridCount) * i;
          ctx.beginPath();
          ctx.moveTo(padding.left, y);
          ctx.lineTo(width - padding.right, y);
          ctx.stroke();
        }
        
        var xAxis = option.xAxis;
        var yAxis = option.yAxis;
        var series = option.series;
        
        ctx.setFillStyle('#999999');
        ctx.setFontSize(10);
        ctx.setTextAlign('right');
        
        if (yAxis && yAxis.data && yAxis.data.length > 0) {
          var yValues = yAxis.data;
          for (var j = 0; j <= gridCount; j++) {
            var value = yValues[gridCount - j] || '';
            var yPos = padding.top + (chartHeight / gridCount) * j;
            ctx.fillText(value.toString(), padding.left - 8, yPos + 4);
          }
        } else {
          for (var g = 0; g <= gridCount; g++) {
            var gyPos = padding.top + (chartHeight / gridCount) * g;
            ctx.fillText((gridCount - g) * 5 + '', padding.left - 8, gyPos + 4);
          }
        }
        
        ctx.setTextAlign('center');
        if (xAxis && xAxis.data && xAxis.data.length > 0) {
          var xValues = xAxis.data;
          var step = Math.ceil(xValues.length / 5);
          for (var k = 0; k < xValues.length; k++) {
            if (k % step === 0 || k === xValues.length - 1) {
              var xPos = padding.left + (chartWidth / (xValues.length - 1)) * k;
              ctx.fillText(xValues[k].toString(), xPos, height - padding.bottom + 18);
            }
          }
        }
        
        if (series && series.length > 0) {
          for (var s = 0; s < series.length; s++) {
            var serie = series[s];
            if (!serie.data) continue;
            
            var data = serie.data;
            var lineColor = (serie.lineStyle && serie.lineStyle.color) ? serie.lineStyle.color : '#0066FF';
            
            var minVal = Math.min.apply(null, data);
            var maxVal = Math.max.apply(null, data);
            var range = maxVal - minVal || 1;
            
            var points = [];
            for (var m = 0; m < data.length; m++) {
              var xCoord = padding.left + (chartWidth / (data.length - 1)) * m;
              var yCoord = padding.top + chartHeight - ((data[m] - minVal) / range) * chartHeight;
              points.push({ x: xCoord, y: yCoord });
            }
            
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var p = 1; p < points.length; p++) {
              ctx.lineTo(points[p].x, points[p].y);
            }
            ctx.setStrokeStyle(lineColor);
            ctx.setLineWidth(2);
            ctx.stroke();
            
            if (serie.areaStyle) {
              ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
              ctx.lineTo(points[0].x, height - padding.bottom);
              ctx.closePath();
              ctx.setFillStyle('rgba(0, 102, 255, 0.1)');
              ctx.fill();
            }
            
            ctx.setFillStyle(lineColor);
            for (var n = 0; n < points.length; n++) {
              ctx.beginPath();
              ctx.arc(points[n].x, points[n].y, 4, 0, 2 * Math.PI);
              ctx.fill();
              
              ctx.setFillStyle('#FFFFFF');
              ctx.beginPath();
              ctx.arc(points[n].x, points[n].y, 2, 0, 2 * Math.PI);
              ctx.fill();
              
              ctx.setFillStyle(lineColor);
            }
          }
        }
        
        ctx.draw();
      }
    };
  }
};

module.exports = chartModule;
