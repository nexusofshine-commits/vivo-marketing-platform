Page({
  data: {
    accountName: '唯品会OCPC账户集合',
    selectedIndex: 0,
    chartType: 'consume',
    chartTitle: '消耗趋势',
    lineAreaHeight: 0,
    lineAreaColor: 'rgba(0,102,255,0.08)',
    overviewMetrics: [
      { name: '有消耗账户数', value: '15', change: '环比 12.5% ↑' },
      { name: '消耗(元)', value: '5,000', change: '环比 15.2% ↑' },
      { name: '转化数', value: '23', change: '环比 8.3% ↓' },
      { name: '平均转化成本', value: '217', change: '环比 22.5% ↑' },
      { name: '展示数', value: '4,555', change: '环比 10.0% ↑' },
      { name: '点击数', value: '123', change: '环比 5.2% ↓' }
    ],
    chartData: []
  },

  onLoad: function() {
    var app = getApp();
    if (app.globalData && app.globalData.currentAccount) {
      this.setData({ accountName: app.globalData.currentAccount });
    }
  },

  onReady: function() {
    this.buildChartData();
  },

  buildChartData: function() {
    var raw = [
      { label: '周一', consume: 12, convert: 2 },
      { label: '周二', consume: 18, convert: 3 },
      { label: '周三', consume: 15, convert: 2 },
      { label: '周四', consume: 22, convert: 4 },
      { label: '周五', consume: 28, convert: 5 },
      { label: '周六', consume: 24, convert: 4 },
      { label: '周日', consume: 30, convert: 6 }
    ];
    var type = this.data.chartType;
    var list = [];
    var maxVal = 30;
    var minDot = 100;
    for (var i = 0; i < raw.length; i++) {
      var val = type === 'consume' ? raw[i].consume : raw[i].convert;
      var pct = Math.round(val * 100 / maxVal);
      list.push({
        label: raw[i].label,
        dotBottom: pct,
        dotColor: type === 'consume' ? '#0066FF' : '#00C853'
      });
      if (pct < minDot) minDot = pct;
    }
    var areaH = Math.round((100 - minDot) * 0.6) + minDot;
    this.setData({
      chartData: list,
      lineAreaHeight: areaH,
      lineAreaColor: type === 'consume' ? 'rgba(0,102,255,0.08)' : 'rgba(0,200,83,0.08)'
    });
  },

  selectMetric: function(e) {
    this.setData({ selectedIndex: e.currentTarget.dataset.index });
  },

  switchChart: function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      chartType: type,
      chartTitle: type === 'consume' ? '消耗趋势' : '转化趋势'
    });
    this.buildChartData();
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