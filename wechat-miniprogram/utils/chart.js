let chartCount = 0;

function initChart(canvasId, page) {
  if (!page) return null;
  
  chartCount++;
  const context = wx.createCanvasContext(canvasId, page);
  
  return {
    context: context,
    setOption: function(option) {
      const ctx = this.context;
      const { grid, xAxis, yAxis, series } = option;
      
      const width = 350;
      const height = 400;
      const padding = {
        left: grid.left || 60,
        right: grid.right || 40,
        top: grid.top || 20,
        bottom: grid.bottom || 40
      };
      
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      
      ctx.clearRect(0, 0, width, height);
      
      ctx.setStrokeStyle('#E5E7EB');
      ctx.setLineWidth(1);
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
      }
      
      ctx.setFillStyle('#999999');
      ctx.setFontSize(20);
      ctx.setTextAlign('right');
      const yValues = yAxis.data || [];
      for (let i = 0; i <= 4; i++) {
        const value = yValues[4 - i] || '';
        const y = padding.top + (chartHeight / 4) * i;
        ctx.fillText(value.toString(), padding.left - 5, y + 6);
      }
      
      ctx.setTextAlign('center');
      const xValues = xAxis.data || [];
      const step = Math.ceil(xValues.length / 7);
      xValues.forEach((label, index) => {
        if (index % step === 0 || index === xValues.length - 1) {
          const x = padding.left + (chartWidth / (xValues.length - 1)) * index;
          ctx.fillText(label.toString(), x, height - padding.bottom + 20);
        }
      });
      
      series.forEach(s => {
        const data = s.data;
        const color = s.lineStyle.color || '#0F62FE';
        
        if (s.type === 'line' && s.areaStyle) {
          const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
          if (typeof s.areaStyle.color === 'object') {
            gradient.addColorStop(0, s.areaStyle.color.colorStops[0].color);
            gradient.addColorStop(1, s.areaStyle.color.colorStops[1].color);
          }
          
          ctx.beginPath();
          data.forEach((value, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * chartHeight;
            
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.lineTo(padding.left + chartWidth, height - padding.bottom);
          ctx.lineTo(padding.left, height - padding.bottom);
          ctx.closePath();
          ctx.setFillStyle(gradient);
          ctx.fill();
        }
        
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(s.lineStyle.width || 4);
        ctx.beginPath();
        
        const minVal = Math.min(...data);
        const maxVal = Math.max(...data);
        const range = maxVal - minVal;
        
        data.forEach((value, index) => {
          const x = padding.left + (chartWidth / (data.length - 1)) * index;
          const y = range > 0 
            ? padding.top + chartHeight - ((value - minVal) / range) * chartHeight 
            : padding.top + chartHeight / 2;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        
        ctx.setFillStyle(color);
        data.forEach((value, index) => {
          const x = padding.left + (chartWidth / (data.length - 1)) * index;
          const y = range > 0 
            ? padding.top + chartHeight - ((value - minVal) / range) * chartHeight 
            : padding.top + chartHeight / 2;
          
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
      
      ctx.draw();
    }
  };
}

module.exports = {
  initChart: initChart
};