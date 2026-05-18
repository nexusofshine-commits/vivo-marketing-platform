var Chart = require('../../utils/chart.js');

Page({
  data: {
    accountName: '唯品会OCPC账户集合',
    selectedMetricIndex: 0,
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
        data: [12, 18, 15, 22, 28, 24, 30],
        color: '#0066FF',
        yAxis: { data: ['30', '25', '20', '15', '10', '5', '0'] }
      },
      convert: {
        data: [2, 3, 2, 4, 5, 4, 6],
        color: '#00C853',
        yAxis: { data: ['6', '5', '4', '3', '2', '1', '0'] }
      }
    };
    
    var data = chartData[type] || chartData.consume;
    
    this.chartInstance.setOption({
      xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: data.yAxis,
      series: [{
        type: 'line',
        data: data.data,
        lineStyle: { color: data.color, width: 2 },
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
    this.drawChart(type === 'consume' ? 'consume' : 'convert');
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
