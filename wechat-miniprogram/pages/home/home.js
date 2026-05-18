var Chart = require('../../utils/chart.js');

Page({
  data: {
    accountName: '唯品会OCPC账户集合',
    selectedMetricIndex: 0,
    chartType: 'consume',
    overviewMetrics: [
      { name: '有消耗账户数', value: '0', change: '环比 0.00% —' },
      { name: '消耗(元)', value: '0.00', change: '环比 ---' },
      { name: '转化数', value: '0', change: '环比 ---' },
      { name: '平均转化成本', value: '0.00', change: '' },
      { name: '展示数', value: '0', change: '' },
      { name: '点击数', value: '0', change: '' }
    ]
  },

  onLoad: function() {
    this.loadData();
  },

  onShow: function() {
    var app = getApp();
    if (app.globalData && app.globalData.selectedAccount) {
      this.setData({
        accountName: app.globalData.selectedAccount
      });
    }
  },

  loadData: function() {
    var that = this;
    
    setTimeout(function() {
      that.setData({
        overviewMetrics: [
          { name: '有消耗账户数', value: '15', change: '环比 12.50% ↑' },
          { name: '消耗(元)', value: '5000.00', change: '环比 15.20% ↑' },
          { name: '转化数', value: '23', change: '环比 8.30% ↓' },
          { name: '平均转化成本', value: '217.39', change: '环比 22.50% ↑' },
          { name: '展示数', value: '4555', change: '环比 10.00% ↑' },
          { name: '点击数', value: '123', change: '环比 5.20% ↓' }
        ]
      });
      
      that.initChart();
    }, 300);
  },

  initChart: function() {
    var that = this;
    
    setTimeout(function() {
      var chart = Chart.initChart('homeChart', that);
      if (chart) {
        that.chartInstance = chart;
        that.drawChart(1);
      }
    }, 100);
  },

  drawChart: function(type) {
    if (!this.chartInstance) return;
    
    var chartData = {
      consume: {
        data: [120, 200, 180, 320, 450, 380, 520],
        color: '#0066FF'
      },
      convert: {
        data: [2, 3, 2, 4, 5, 4, 6],
        color: '#00C853'
      }
    };
    
    var data = chartData[type] || chartData.consume;
    
    this.chartInstance.setOption({
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: {},
      series: [{
        type: 'line',
        data: data.data,
        lineStyle: { color: data.color, width: 3 },
        areaStyle: { color: data.color }
      }]
    });
    
    this.setData({ chartType: type });
  },

  selectMetric: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      selectedMetricIndex: index
    });
  },

  switchChartTab: function(e) {
    var type = e.currentTarget.dataset.type;
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
