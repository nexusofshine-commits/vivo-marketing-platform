Page({
  data: {
    trendData: [],
    trendAreaH: 0
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
    var minDot = 100;
    for (var i = 0; i < raw.length; i++) {
      var pct = Math.round(raw[i].value * 100 / 52);
      list.push({
        label: raw[i].label,
        dotBottom: pct
      });
      if (pct < minDot) minDot = pct;
    }
    this.setData({
      trendData: list,
      trendAreaH: Math.round((100 - minDot) * 0.6) + minDot
    });
  }
})