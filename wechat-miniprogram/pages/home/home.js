const Chart = require('../../utils/chart.js');

Page({
  data: {
    accountName: '唯品会OCPC账户集合',
    selectedMetricIndex: 0,
    overviewMetrics: [
      { name: '有消耗账户数', value: '0', change: '环比 0.00% —' },
      { name: '消耗(元)', value: '0.00', change: '环比 ---' },
      { name: '转化数', value: '0', change: '环比 ---' },
      { name: '平均转化成本', value: '0.00', change: '' },
      { name: '展示数', value: '0', change: '' },
      { name: '点击数', value: '0', change: '' }
    ]
  },

  onLoad() {
    setTimeout(() => {
      this.setData({
        overviewMetrics: [
          { name: '有消耗账户数', value: '15', change: '环比 12.50% ↑' },
          { name: '消耗(元)', value: '5000.00', change: '环比 15.20% ↑' },
          { name: '转化数', value: '23', change: '环比 8.30% ↓' },
          { name: '平均转化成本', value: '217.39', change: '环比 22.50% ↑' },
          { name: '展示数', value: '4555', change: '环比 10.00% ↑' },
          { name: '点击数', value: '123', change: '环比 5.20% ↓' }
        ]
      });
      this.initChart();
    }, 500);
  },

  onShow() {
    const app = getApp();
    if (app.globalData.selectedAccount) {
      this.setData({
        accountName: app.globalData.selectedAccount
      });
    }
  },

  initChart() {
    const query = wx.createSelectorQuery();
    query.select('#homeChart')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          this.chart = new Chart({
            canvas: res[0].node,
            width: res[0].width,
            height: res[0].height
          });
          this.drawChart(0);
        }
      });
  },

  drawChart(metricIndex) {
    if (!this.chart) return;

    const dataSets = [
      // 有消耗账户数
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2],
      // 消耗
      [120, 200, 180, 320, 450, 380, 520, 480, 600, 550, 480, 500],
      // 转化数
      [2, 3, 2, 4, 5, 4, 6, 5, 7, 6, 5, 3],
      // 平均转化成本
      [200, 180, 210, 190, 200, 185, 215, 205, 220, 215, 210, 217],
      // 展示数
      [400, 520, 480, 580, 650, 590, 720, 680, 780, 720, 680, 455],
      // 点击数
      [12, 18, 15, 22, 28, 24, 32, 28, 35, 30, 26, 12]
    ];

    this.chart.draw(dataSets[metricIndex]);
  },

  selectMetric(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedMetricIndex: index
    });
    this.drawChart(index);
  },

  onChartTouch(e) {},
  onChartMove(e) {},
  onChartEnd(e) {},

  goToAccountSelect() {
    wx.navigateTo({ url: '/pages/account-select/account-select' });
  },

  goToProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' });
  },

  goToDiagnosis() {
    wx.switchTab({ url: '/pages/diagnosis/diagnosis' });
  }
});