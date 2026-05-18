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
    ],
    chartData: [],
    chartTitle: '消耗趋势'
  },

  onLoad: function() {
    var app = getApp();
    if (app.globalData && app.globalData.selectedAccount) {
      this.setData({ accountName: app.globalData.selectedAccount });
    }
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
    for (var i = 0; i < raw.length; i++) {
      var val = type === 'consume' ? raw[i].consume : raw[i].convert;
      list.push({
        label: raw[i].label,
        barHeight: Math.round(val * 100 / 30),
        barColor: type === 'consume' ? '#0066FF' : '#00C853'
      });
    }
    this.setData({ chartData: list });
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
