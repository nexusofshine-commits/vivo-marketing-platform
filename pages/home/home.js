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
    chartData: [
      { label: '周一', consume: 12, convert: 2 },
      { label: '周二', consume: 18, convert: 3 },
      { label: '周三', consume: 15, convert: 2 },
      { label: '周四', consume: 22, convert: 4 },
      { label: '周五', consume: 28, convert: 5 },
      { label: '周六', consume: 24, convert: 4 },
      { label: '周日', consume: 30, convert: 6 }
    ]
  },

  onLoad: function() {
    var app = getApp();
    if (app.globalData && app.globalData.selectedAccount) {
      this.setData({ accountName: app.globalData.selectedAccount });
    }
  },

  selectMetric: function(e) {
    this.setData({ selectedIndex: e.currentTarget.dataset.index });
  },

  switchChart: function(e) {
    this.setData({ chartType: e.currentTarget.dataset.type });
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