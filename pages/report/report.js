Page({
  data: {
    currentTab: 'overview',
    currentDate: '7days',
    trendData: [
      { label: '05-12', value: 42 },
      { label: '05-13', value: 47 },
      { label: '05-14', value: 46 },
      { label: '05-15', value: 52 },
      { label: '05-16', value: 50 },
      { label: '05-17', value: 51 },
      { label: '05-18', value: 51 }
    ],
    conversionData: [
      { label: '05-12', activation: 70, retention: 40 },
      { label: '05-13', activation: 80, retention: 45 },
      { label: '05-14', activation: 74, retention: 42 },
      { label: '05-15', activation: 86, retention: 49 },
      { label: '05-16', activation: 78, retention: 44 },
      { label: '05-17', activation: 84, retention: 47 },
      { label: '05-18', activation: 81, retention: 46 }
    ]
  },

  switchTab: function(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab });
  },

  switchDate: function(e) {
    this.setData({ currentDate: e.currentTarget.dataset.date });
  },

  goToDetail: function() {
    wx.navigateTo({ url: '/pages/plan-detail/plan-detail' });
  }
})