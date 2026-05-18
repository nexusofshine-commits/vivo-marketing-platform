var Chart = require('../../utils/chart.js');

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

  onShow: function() {
    var chart = Chart.initChart('homeChart', this);
    if (chart) {
      this.chartInstance = chart;
      this.updateChart('consume');
    }
  },

  updateChart: function(type) {
    if (!this.chartInstance) return;
    var data = type === 'consume' 
      ? { data: [12, 18, 15, 22, 28, 24, 30], color: '#0066FF' }
      : { data: [2, 3, 2, 4, 5, 4, 6], color: '#00C853' };
    
    this.chartInstance.setOption({
      xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      series: [{ data: data.data, lineStyle: { color: data.color, width: 2 }, areaStyle: { color: data.color } }]
    });
    this.setData({ chartType: type });
  },

  selectMetric: function(e) {
    this.setData({ selectedIndex: e.currentTarget.dataset.index });
  },

  switchChart: function(e) {
    this.updateChart(e.currentTarget.dataset.type);
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
