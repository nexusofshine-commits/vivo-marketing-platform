var app = getApp();
var util = require('../../utils/chart.js');

Page({
  data: {
    
  },
  
  onShow: function() {
    this.updateChart();
  },
  
  updateChart: function() {
    var that = this;
    setTimeout(function() {
      var trendData = app.globalData.trendData;
      var canvas = util.initChart('detail-trend-chart', that);
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
    }, 100);
  }
})
