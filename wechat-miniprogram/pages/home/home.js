const app = getApp();
const util = require('../../utils/chart.js');

Page({
  data: {
    currentAccount: '唯品会拉新A'
  },
  
  onLoad() {
    this.setData({
      currentAccount: app.globalData.currentAccount
    });
  },
  
  onShow() {
    this.setData({
      currentAccount: app.globalData.currentAccount
    });
    this.updateChart();
  },
  
  updateChart() {
    const trendData = app.globalData.trendData;
    const canvas = util.initChart('home-trend-chart', this);
    if (canvas) {
      const data = trendData.spend;
      const labels = trendData.labels;
      
      const option = {
        title: {
          display: false
        },
        grid: {
          left: 60,
          right: 40,
          top: 20,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          data: labels,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#E5E7EB'
            }
          },
          axisLabel: {
            color: '#999999',
            fontSize: 20
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999999',
            fontSize: 20
          },
          splitLine: {
            lineStyle: {
              color: '#E5E7EB'
            }
          }
        },
        series: [{
          type: 'line',
          data: data,
          smooth: true,
          lineStyle: {
            color: '#0F62FE',
            width: 4
          },
          itemStyle: {
            color: '#0F62FE'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(15, 98, 254, 0.3)' },
                { offset: 1, color: 'rgba(15, 98, 254, 0.05)' }
              ]
            }
          }
        }]
      };
      
      canvas.setOption(option);
    }
  },
  
  touchHandler(e) {
    console.log('touch', e);
  },
  
  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },
  
  switchDate() {
    wx.showToast({
      title: '切换日期范围',
      icon: 'none'
    });
  }
})