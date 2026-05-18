Page({
  data: {
    currentTab: 'overview',
    currentDate: '7days',
    trendData: [],
    conversionData: [],
    trendAreaH: 0,
    convAreaH: 0
  },

  onReady: function() {
    this.buildTrendData();
    this.buildConversionData();
  },

  buildTrendData: function() {
    var raw = [
      { label: '05-12', value: 42 },
      { label: '05-13', value: 47 },
      { label: '05-14', value: 46 },
      { label: '05-15', value: 52 },
      { label: '05-16', value: 50 },
      { label: '05-17', value: 51 },
      { label: '05-18', value: 51 }
    ];
    var list = [];
    var minDot = 100;
    for (var i = 0; i < raw.length; i++) {
      var pct = Math.round(raw[i].value * 100 / 52);
      list.push({ label: raw[i].label, dotBottom: pct });
      if (pct < minDot) minDot = pct;
    }
    this.setData({
      trendData: list,
      trendAreaH: Math.round((100 - minDot) * 0.6) + minDot
    });
  },

  buildConversionData: function() {
    var raw = [
      { label: '05-12', activation: 70, retention: 40 },
      { label: '05-13', activation: 80, retention: 45 },
      { label: '05-14', activation: 74, retention: 42 },
      { label: '05-15', activation: 86, retention: 49 },
      { label: '05-16', activation: 78, retention: 44 },
      { label: '05-17', activation: 84, retention: 47 },
      { label: '05-18', activation: 81, retention: 46 }
    ];
    var list = [];
    var minDot = 100;
    for (var i = 0; i < raw.length; i++) {
      var actPct = Math.round(raw[i].activation * 100 / 86);
      var retPct = Math.round(raw[i].retention * 100 / 86);
      list.push({
        label: raw[i].label,
        actBottom: actPct,
        retBottom: retPct
      });
      if (retPct < minDot) minDot = retPct;
    }
    this.setData({
      conversionData: list,
      convAreaH: Math.round((100 - minDot) * 0.6) + minDot
    });
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