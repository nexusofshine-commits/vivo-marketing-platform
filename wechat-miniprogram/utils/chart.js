module.exports = {
  initChart: function(canvasId) {
    var ctx = wx.createCanvasContext(canvasId);
    return {
      setOption: function(option) {
        try {
          var width = 300, height = 240, left = 35, top = 15, bottom = 25, right = 10;
          var chartW = width - left - right, chartH = height - top - bottom;
          
          ctx.clearRect(0, 0, width, height);
          
          ctx.setStrokeStyle('#E8EBF0');
          ctx.setLineWidth(1);
          for (var i = 0; i <= 3; i++) {
            var y = top + (chartH / 3) * i;
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(width - right, y);
            ctx.stroke();
          }
          
          ctx.setFillStyle('#999');
          ctx.setFontSize(9);
          ctx.setTextAlign('right');
          for (var j = 0; j <= 3; j++) {
            ctx.fillText((3 - j) * 15 + '', left - 3, top + (chartH / 3) * j + 3);
          }
          
          ctx.setTextAlign('center');
          var labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          var xStep = chartW / 6;
          for (var k = 0; k < labels.length; k++) {
            ctx.fillText(labels[k], left + xStep * k, height - 5);
          }
          
          if (option && option.series && option.series[0] && option.series[0].data) {
            var data = option.series[0].data;
            var color = '#0066FF';
            if (option.series[0].lineStyle && option.series[0].lineStyle.color) {
              color = option.series[0].lineStyle.color;
            }
            
            var maxVal = 30;
            var minVal = 0;
            var range = maxVal - minVal || 1;
            
            ctx.beginPath();
            for (var m = 0; m < data.length; m++) {
              var x = left + xStep * m;
              var y = top + chartH - ((data[m] - minVal) / range) * chartH;
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
              var px = left + xStep * n;
              var py = top + chartH - ((data[n] - minVal) / range) * chartH;
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, 2 * Math.PI);
              ctx.setFillStyle(color);
              ctx.fill();
            }
          }
          ctx.draw();
        } catch (e) {
          console.log('Chart error:', e);
        }
      }
    };
  }
};