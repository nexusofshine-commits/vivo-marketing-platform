var chartModule = {
  initChart: function(canvasId, page) {
    if (!canvasId || !page) {
      return null;
    }
    
    try {
      var ctx = wx.createCanvasContext(canvasId, page);
      
      return {
        context: ctx,
        setOption: function(option) {
          if (!option) return;
          
          var width = 320;
          var height = 280;
          var padding = { left: 45, right: 15, top: 15, bottom: 35 };
          var chartWidth = width - padding.left - padding.right;
          var chartHeight = height - padding.top - padding.bottom;
          
          ctx.clearRect(0, 0, width, height);
          
          ctx.setStrokeStyle('#E8EBF0');
          ctx.setLineWidth(1);
          for (var i = 0; i <= 4; i++) {
            var y = padding.top + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
          }
          
          ctx.setFillStyle('#999999');
          ctx.setFontSize(10);
          ctx.setTextAlign('right');
          for (var j = 0; j <= 4; j++) {
            ctx.fillText((4 - j) * 10 + '', padding.left - 5, padding.top + (chartHeight / 4) * j + 4);
          }
          
          ctx.setTextAlign('center');
          var labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          var xStep = chartWidth / 6;
          for (var k = 0; k < labels.length; k++) {
            ctx.fillText(labels[k], padding.left + xStep * k, height - 10);
          }
          
          var series = option.series;
          if (series && series[0] && series[0].data) {
            var data = series[0].data;
            var color = '#0066FF';
            if (series[0].lineStyle && series[0].lineStyle.color) {
              color = series[0].lineStyle.color;
            }
            
            var minVal = Math.min.apply(null, data);
            var maxVal = Math.max.apply(null, data);
            var range = maxVal - minVal || 1;
            
            ctx.beginPath();
            for (var m = 0; m < data.length; m++) {
              var x = padding.left + xStep * m;
              var y = padding.top + chartHeight - ((data[m] - minVal) / range) * chartHeight;
              if (m === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.setStrokeStyle(color);
            ctx.setLineWidth(2);
            ctx.stroke();
            
            for (var n = 0; n < data.length; n++) {
              var x = padding.left + xStep * n;
              var y = padding.top + chartHeight - ((data[n] - minVal) / range) * chartHeight;
              ctx.beginPath();
              ctx.arc(x, y, 4, 0, 2 * Math.PI);
              ctx.setFillStyle(color);
              ctx.fill();
              
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, 2 * Math.PI);
              ctx.setFillStyle('#FFFFFF');
              ctx.fill();
            }
          }
          
          ctx.draw();
        }
      };
    } catch (e) {
      return null;
    }
  }
};

module.exports = chartModule;
