module.exports = {
  initChart: function(canvasId, page) {
    var ctx = wx.createCanvasContext(canvasId, page);
    return {
      setOption: function(option) {
        if (!option) return;
        var width = 320, height = 320, left = 45, top = 20, bottom = 30, right = 15;
        var chartW = width - left - right, chartH = height - top - bottom;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.setStrokeStyle('#E8EBF0');
        ctx.setLineWidth(1);
        for (var i = 0; i <= 4; i++) {
          var y = top + (chartH / 4) * i;
          ctx.beginPath();
          ctx.moveTo(left, y);
          ctx.lineTo(width - right, y);
          ctx.stroke();
        }
        
        ctx.setFillStyle('#999');
        ctx.setFontSize(10);
        ctx.setTextAlign('right');
        for (var j = 0; j <= 4; j++) {
          ctx.fillText((4 - j) * 10 + '', left - 5, top + (chartH / 4) * j + 4);
        }
        
        ctx.setTextAlign('center');
        var labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        var xStep = chartW / 6;
        for (var k = 0; k < labels.length; k++) {
          ctx.fillText(labels[k], left + xStep * k, height - 8);
        }
        
        if (option.series && option.series[0] && option.series[0].data) {
          var data = option.series[0].data;
          var color = option.series[0].lineStyle && option.series[0].lineStyle.color || '#0066FF';
          var minVal = Math.min.apply(null, data);
          var maxVal = Math.max.apply(null, data);
          var range = maxVal - minVal || 1;
          
          ctx.beginPath();
          for (var m = 0; m < data.length; m++) {
            var x = left + xStep * m;
            var y = top + chartH - ((data[m] - minVal) / range) * chartH;
            m === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.setStrokeStyle(color);
          ctx.setLineWidth(2);
          ctx.stroke();
          
          for (var n = 0; n < data.length; n++) {
            var px = left + xStep * n;
            var py = top + chartH - ((data[n] - minVal) / range) * chartH;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, 2 * Math.PI);
            ctx.setFillStyle(color);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, 2 * Math.PI);
            ctx.setFillStyle('#fff');
            ctx.fill();
          }
        }
        ctx.draw();
      }
    };
  }
};
