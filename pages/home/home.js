Page({
  data: {
    accountName: '唯品会OCPC账户集合',
    selectedIndex: 0,
    chartType: 'consume',
    overviewMetrics: [
      { name: '有消耗账户数', value: '15', change: '环比 12.5% ↑' },
      { name: '消耗(元)', value: '5,000', change: '环比 15.2% ↑' },
      { name: '转化数', value: '23', change: '环比 8.3% ↓' },
      { name: '平均转化成本', value: '217', change: '环比 22.5% ↑' },
      { name: '展示数', value: '4,555', change: '环比 10.0% ↑' },
      { name: '点击数', value: '123', change: '环比 5.2% ↓' }
    ]
  },

  onLoad: function() {
    var app = getApp();
    if (app.globalData && app.globalData.selectedAccount) {
      this.setData({ accountName: app.globalData.selectedAccount });
    }
  },

  onReady: function() {
    this.initChart();
  },

  initChart: function() {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#homeChart').fields({ node: true, size: true }).exec(function(res) {
      if (!res[0]) return;
      
      var canvas = res[0].node;
      var ctx = canvas.getContext('2d');
      var dpr = wx.getSystemInfoSync().pixelRatio;
      
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
      
      that.canvasCtx = ctx;
      that.canvasWidth = res[0].width;
      that.canvasHeight = res[0].height;
      
      that.drawChart('consume');
    });
  },

  drawChart: function(type) {
    if (!this.canvasCtx) return;
    
    var ctx = this.canvasCtx;
    var width = this.canvasWidth;
    var height = this.canvasHeight;
    var left = 35, top = 15, bottom = 25, right = 10;
    var chartW = width - left - right;
    var chartH = height - top - bottom;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#E8EBF0';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 3; i++) {
      var y = top + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(width - right, y);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#999';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    for (var j = 0; j <= 3; j++) {
      ctx.fillText((3 - j) * 15 + '', left - 3, top + (chartH / 3) * j + 3);
    }
    
    ctx.textAlign = 'center';
    var labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    var xStep = chartW / 6;
    for (var k = 0; k < labels.length; k++) {
      ctx.fillText(labels[k], left + xStep * k, height - 5);
    }
    
    var data = type === 'consume' 
      ? [12, 18, 15, 22, 28, 24, 30]
      : [2, 3, 2, 4, 5, 4, 6];
    var color = type === 'consume' ? '#0066FF' : '#00C853';
    
    var maxVal = 30;
    var minVal = 0;
    var range = maxVal - minVal || 1;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
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
    ctx.stroke();
    
    ctx.fillStyle = color;
    for (var n = 0; n < data.length; n++) {
      var px = left + xStep * n;
      var py = top + chartH - ((data[n] - minVal) / range) * chartH;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  },

  selectMetric: function(e) {
    this.setData({ selectedIndex: e.currentTarget.dataset.index });
  },

  switchChart: function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({ chartType: type });
    this.drawChart(type);
  },

  goToAccountSelect: function() {
    wx.navigateTo({ url: '/pages/account-select/account-select' });
  },

  goToProfile: function() {
    wx.navigateTo({ url: '/pages/profile/profile' });
  },

  goToDiagnosis: function() {
    wx.switchTab({ url: '/pages/diagnosis/diagnosis' });
  }
});