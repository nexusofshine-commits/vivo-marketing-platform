const app = getApp();
const util = require('../../utils/chart.js');

Page({
  data: {
    currentTab: 'overview',
    currentDate: '7days'
  },
  
  onShow() {
    this.updateCharts();
  },
  
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    
    wx.showToast({
      title: '已切换至' + (tab === 'overview' ? '概览' : tab === 'plan' ? '计划' : tab === 'account' ? '账户' : '创意'),
      icon: 'none'
    });
    
    this.updateCharts();
  },
  
  switchDate(e) {
    const date = e.currentTarget.dataset.date;
    this.setData({
      currentDate: date
    });
    
    wx.showToast({
      title: '已切换至' + (date === 'today' ? '今日' : date === '7days' ? '近7日' : date === '30days' ? '近30日' : '自定义'),
      icon: 'none'
    });
    
    this.updateCharts();
  },
  
  updateCharts() {
    setTimeout(() => {
      this.drawTrendChart();
      this.drawConversionChart();
    }, 100);
  },
  
  drawTrendChart() {
    const trendData = app.globalData.trendData;
    const canvas = util.initChart('report-trend-chart', this);
    if (canvas) {
      canvas.setOption({
        grid: {
          left: 60,
          right: 40,
          top: 20,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          data: trendData.labels,
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
          data: [10000, 16000],
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
          data: trendData.spend,
          lineStyle: {
            color: '#0F62FE',
            width: 4
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
      });
    }
  },
  
  drawConversionChart() {
    const conversionData = app.globalData.conversionData;
    const canvas = util.initChart('conversion-chart', this);
    if (canvas) {
      canvas.setOption({
        grid: {
          left: 60,
          right: 40,
          top: 20,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          data: conversionData.labels,
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
          data: [1000, 4000],
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
        series: [
          {
            type: 'line',
            data: conversionData.activation,
            lineStyle: {
              color: '#0F62FE',
              width: 4
            }
          },
          {
            type: 'line',
            data: conversionData.retention,
            lineStyle: {
              color: '#00A870',
              width: 4
            }
          }
        ]
      });
    }
  },
  
  goToDetail() {
    wx.navigateTo({
      url: '/pages/plan-detail/plan-detail'
    });
  }
})