Page({
  data: {
    trendData: []
  },

  onReady: function() {
    this.buildChartData();
  },

  buildChartData: function() {
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
    for (var i = 0; i < raw.length; i++) {
      list.push({
        label: raw[i].label,
        barHeight: Math.round(raw[i].value * 100 / 52)
      });
    }
    this.setData({ trendData: list });
  }
})