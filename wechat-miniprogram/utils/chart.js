var chartModule = {
  initChart: function(canvasId, page) {
    if (!canvasId || !page) {
      console.error('Chart init failed: missing canvasId or page');
      return null;
    }
    
    try {
      var context = wx.createCanvasContext(canvasId, page);
      
      return {
        context: context,
        setOption: function(option) {
          if (!option) return;
          
          var ctx = this.context;
          if (!ctx) return;
          
          var grid = option.grid;
          var xAxis = option.xAxis;
          var yAxis = option.yAxis;
          var series = option.series;
          
          var defaultWidth = 320;
          var defaultHeight = 200;
          var padding = {
            left: (grid && grid.left) ? grid.left : 40,
            right: (grid && grid.right) ? grid.right : 15,
            top: (grid && grid.top) ? grid.top : 15,
            bottom: (grid && grid.bottom) ? grid.bottom : 25
          };
          
          var chartWidth = defaultWidth - padding.left - padding.right;
          var chartHeight = defaultHeight - padding.top - padding.bottom;
          
          ctx.clearRect(0, 0, defaultWidth, defaultHeight);
          
          ctx.setStrokeStyle('#E8EBF0');
          ctx.setLineWidth(1);
          for (var i = 0; i <= 3; i++) {
            var y = padding.top + (chartHeight / 3) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(defaultWidth - padding.right, y);
            ctx.stroke();
          }
          
          ctx.setFillStyle('#999999');
          ctx.setFontSize(10);
          ctx.setTextAlign('right');
          
          if (yAxis && yAxis.data && yAxis.data.length > 0) {
            var yValues = yAxis.data;
            for (var j = 0; j <= 3; j++) {
              var value = yValues[3 - j] || '';
              var yPos = padding.top + (chartHeight / 3) * j;
              ctx.fillText(value.toString(), padding.left - 5, yPos + 4);
            }
          }
          
          ctx.setTextAlign('center');
          if (xAxis && xAxis.data && xAxis.data.length > 0) {
            var xValues = xAxis.data;
            var xStep = Math.ceil(xValues.length / 5);
            for (var k = 0; k < xValues.length; k++) {
              if (k % xStep === 0 || k === xValues.length - 1) {
                var xPos = padding.left + (chartWidth / (xValues.length - 1)) * k;
                ctx.fillText(xValues[k].toString(), xPos, defaultHeight - padding.bottom + 15);
              }
            }
          }
          
          if (series && series.length > 0) {
            for (var s = 0; s < series.length; s++) {
              var serie = series[s];
              if (!serie.data) continue;
              
              var data = serie.data;
              var lineColor = (serie.lineStyle && serie.lineStyle.color) ? serie.lineStyle.color : '#0066FF';
              var lineWidth = (serie.lineStyle && serie.lineStyle.width) ? serie.lineStyle.width : 2;
              
              var minVal = Math.min.apply(null, data);
              var maxVal = Math.max.apply(null, data);
              var range = maxVal - minVal;
              
              ctx.beginPath();
              for (var m = 0; m < data.length; m++) {
                var xCoord = padding.left + (chartWidth / (data.length - 1)) * m;
                var yCoord;
                if (range > 0) {
                  yCoord = padding.top + chartHeight - ((data[m] - minVal) / range) * chartHeight;
                } else {
                  yCoord = padding.top + chartHeight / 2;
                }
                
                if (m === 0) {
                  ctx.moveTo(xCoord, yCoord);
                } else {
                  ctx.lineTo(xCoord, yCoord);
                }
              }
              ctx.setStrokeStyle(lineColor);
              ctx.setLineWidth(lineWidth);
              ctx.stroke();
              
              ctx.setFillStyle(lineColor);
              for (var n = 0; n < data.length; n++) {
                var xDot = padding.left + (chartWidth / (data.length - 1)) * n;
                var yDot;
                if (range > 0) {
                  yDot = padding.top + chartHeight - ((data[n] - minVal) / range) * chartHeight;
                } else {
                  yDot = padding.top + chartHeight / 2;
                }
                
                ctx.beginPath();
                ctx.arc(xDot, yDot, 3, 0, 2 * Math.PI);
                ctx.fill();
              }
            }
          }
          
          ctx.draw();
        }
      };
    } catch (e) {
      console.error('Chart init error:', e);
      return null;
    }
  }
};

module.exports = chartModule;
