Page({
  data: {
    accountName: '',
    accountType: '',
    accountTypeTag: '',
    selectedIndex: 0,
    chartTitle: '',
    lineAreaHeight: 0,
    lineAreaColor: 'rgba(0,102,255,0.08)',
    chartData: [],
    showMetricPicker: false,
    
    allMetrics: {},
    
    selectedMetrics: [],
    
    topMetrics: []
  },

  onLoad: function() {
    var app = getApp();
    this.initAllMetrics();
    this.loadSelectedMetrics();
    
    if (app.globalData && app.globalData.currentAccount) {
      this.setData({ accountName: app.globalData.currentAccount });
    }
    if (app.globalData && app.globalData.accountType) {
      this.setData({ accountType: app.globalData.accountType });
      var tag = '';
      if (app.globalData.accountType === '经营主体') {
        tag = '经营主体';
      } else if (app.globalData.accountType === '业务单元') {
        tag = '业务单元';
      } else {
        tag = '投放账号';
      }
      this.setData({ accountTypeTag: tag });
    }
    
    this.updateTopMetrics();
    this.updateOverviewMetrics();
  },

  onReady: function() {
    this.buildChartData();
  },

  initAllMetrics: function() {
    var basicMetrics = [
      { key: 'impression', name: '曝光量', color: '#0066FF' },
      { key: 'click', name: '点击量', color: '#0066FF' },
      { key: 'ctr', name: '点击率', color: '#0066FF' },
      { key: 'cpm', name: '千次展示均价', color: '#0066FF' },
      { key: 'cpc', name: '点击均价', color: '#0066FF' },
      { key: 'cost', name: '花费', color: '#0066FF' },
      { key: 'billing', name: '计费量', color: '#0066FF' }
    ];
    
    var webMetrics = [
      { key: 'web_shallow_conv', name: '浅层转化量', color: '#00C853' },
      { key: 'web_shallow_cost', name: '浅层转化成本', color: '#00C853' },
      { key: 'web_shallow_rate', name: '浅层转化率', color: '#00C853' },
      { key: 'web_deep_conv', name: '深层转化量', color: '#00C853' },
      { key: 'web_deep_cost', name: '深层转化成本', color: '#00C853' },
      { key: 'web_deep_rate', name: '深层转化率', color: '#00C853' },
      { key: 'web_form_submit', name: '表单提交量', color: '#00C853' },
      { key: 'web_form_rate', name: '表单提交转化率', color: '#00C853' },
      { key: 'web_form_cost', name: '表单提交成本', color: '#00C853' },
      { key: 'web_btn_click', name: '按钮点击量', color: '#00C853' },
      { key: 'web_btn_rate', name: '按钮点击转化率', color: '#00C853' },
      { key: 'web_btn_cost', name: '按钮点击成本', color: '#00C853' },
      { key: 'web_wechat_qrcode', name: '微信-识别二维码数', color: '#00C853' },
      { key: 'web_wechat_qrcode_rate', name: '微信-识别二维码率', color: '#00C853' },
      { key: 'web_wechat_qrcode_cost', name: '微信-识别二维码成本', color: '#00C853' },
      { key: 'web_wechat_add', name: '微信添加微信数', color: '#00C853' },
      { key: 'web_wechat_add_rate', name: '微信添加微信率', color: '#00C853' },
      { key: 'web_wechat_add_cost', name: '微信添加微信成本', color: '#00C853' },
      { key: 'web_wechat_msg', name: '微信用户首次消息数', color: '#00C853' },
      { key: 'web_wechat_msg_rate', name: '微信-用户首次消息率', color: '#00C853' },
      { key: 'web_wechat_msg_cost', name: '微信-用户首次消息成本', color: '#00C853' },
      { key: 'web_consult', name: '有效咨询数', color: '#00C853' },
      { key: 'web_consult_rate', name: '有效咨询率', color: '#00C853' },
      { key: 'web_consult_cost', name: '有效咨询成本', color: '#00C853' }
    ];
    
    this.setData({
      allMetrics: {
        basic: { name: '基础指标', list: basicMetrics },
        web: { name: '网页转化指标', list: webMetrics }
      }
    });
  },

  loadSelectedMetrics: function() {
    var defaultMetrics = [
      { key: 'impression', name: '曝光量', value: '4,555', change: '环比 10.0% ↑', color: '#0066FF' },
      { key: 'click', name: '点击量', value: '123', change: '环比 5.2% ↓', color: '#0066FF' },
      { key: 'cost', name: '花费', value: '5,000', change: '环比 15.2% ↑', color: '#0066FF' },
      { key: 'ctr', name: '点击率', value: '2.7%', change: '环比 3.1% ↓', color: '#0066FF' },
      { key: 'cpc', name: '点击均价', value: '40.65', change: '环比 8.5% ↑', color: '#0066FF' },
      { key: 'web_shallow_conv', name: '浅层转化量', value: '23', change: '环比 8.3% ↓', color: '#00C853' }
    ];
    
    try {
      var saved = wx.getStorageSync('selectedMetrics');
      if (saved && saved.length === 6) {
        this.setData({ selectedMetrics: saved });
      } else {
        this.setData({ selectedMetrics: defaultMetrics });
      }
    } catch (e) {
      this.setData({ selectedMetrics: defaultMetrics });
    }
  },

  updateTopMetrics: function() {
    var type = this.data.accountType;
    var topMetrics = [];
    
    if (type === '经营主体' || type === '业务单元') {
      topMetrics = [
        { key: 'balance', name: '当前余额', value: '100,000.00', action: '' },
        { key: 'todayCost', name: '今日消耗', value: '5,000.00', action: '' },
        { key: 'activeAccounts', name: '有消耗账户', value: '15/27', action: 'goToAccountManage' }
      ];
    } else {
      topMetrics = [
        { key: 'balance', name: '当前余额', value: '100,000.00', action: '' },
        { key: 'dailyBudget', name: '日预算', value: '10,000.00', action: 'editBudget' },
        { key: 'todayCost', name: '今日消耗', value: '5,000.00', action: '' }
      ];
    }
    
    this.setData({ topMetrics: topMetrics });
  },

  updateOverviewMetrics: function() {
    var metrics = this.data.selectedMetrics;
    if (metrics.length > 0) {
      this.setData({ chartTitle: metrics[0].name + '趋势' });
    }
  },

  buildChartData: function() {
    var selectedIndex = this.data.selectedIndex;
    var selectedMetrics = this.data.selectedMetrics;
    var selectedMetric = selectedMetrics[selectedIndex];
    
    if (!selectedMetric) return;
    
    var raw = [
      { label: '周一', value: 12 },
      { label: '周二', value: 18 },
      { label: '周三', value: 15 },
      { label: '周四', value: 22 },
      { label: '周五', value: 28 },
      { label: '周六', value: 24 },
      { label: '周日', value: 30 }
    ];
    
    var list = [];
    var maxVal = 30;
    var minDot = 100;
    var color = selectedMetric.color || '#0066FF';
    
    for (var i = 0; i < raw.length; i++) {
      var val = raw[i].value;
      var pct = Math.round(val * 100 / maxVal);
      list.push({
        label: raw[i].label,
        dotBottom: pct,
        dotColor: color
      });
      if (pct < minDot) minDot = pct;
    }
    
    var areaH = Math.round((100 - minDot) * 0.6) + minDot;
    var areaColor = color.replace(')', ', 0.08)').replace('#', 'rgba(');
    if (areaColor.indexOf('rgba') === -1) {
      areaColor = 'rgba(0,102,255,0.08)';
    }
    
    this.setData({
      chartData: list,
      lineAreaHeight: areaH,
      lineAreaColor: areaColor,
      chartTitle: selectedMetric.name + '趋势'
    });
  },

  selectMetric: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ selectedIndex: index });
    this.updateOverviewMetrics();
    this.buildChartData();
  },

  openMetricPicker: function() {
    this.setData({ showMetricPicker: true });
  },

  closeMetricPicker: function() {
    this.setData({ showMetricPicker: false });
  },

  toggleMetric: function(e) {
    var key = e.currentTarget.dataset.key;
    var category = e.currentTarget.dataset.category;
    var selectedMetrics = this.data.selectedMetrics;
    var allMetrics = this.data.allMetrics;
    var metricList = allMetrics[category].list;
    
    var metric = null;
    for (var i = 0; i < metricList.length; i++) {
      if (metricList[i].key === key) {
        metric = metricList[i];
        break;
      }
    }
    
    if (!metric) return;
    
    var existingIndex = -1;
    for (var j = 0; j < selectedMetrics.length; j++) {
      if (selectedMetrics[j].key === key) {
        existingIndex = j;
        break;
      }
    }
    
    if (existingIndex !== -1) {
      selectedMetrics.splice(existingIndex, 1);
    } else if (selectedMetrics.length < 6) {
      selectedMetrics.push({
        key: metric.key,
        name: metric.name,
        value: '0',
        change: '环比 0.0% -',
        color: metric.color
      });
    }
    
    this.setData({ selectedMetrics: selectedMetrics });
    
    if (this.data.selectedIndex >= selectedMetrics.length && selectedMetrics.length > 0) {
      this.setData({ selectedIndex: 0 });
    }
  },

  isMetricSelected: function(key) {
    var selectedMetrics = this.data.selectedMetrics;
    for (var i = 0; i < selectedMetrics.length; i++) {
      if (selectedMetrics[i].key === key) {
        return true;
      }
    }
    return false;
  },

  saveMetrics: function() {
    try {
      wx.setStorageSync('selectedMetrics', this.data.selectedMetrics);
      this.closeMetricPicker();
      this.updateOverviewMetrics();
      this.buildChartData();
    } catch (e) {}
  },

  topMetricAction: function(e) {
    var action = e.currentTarget.dataset.action;
    if (action === 'goToAccountManage') {
      wx.switchTab({ url: '/pages/account-manage/account-manage' });
    } else if (action === 'editBudget') {
      wx.showToast({
        title: '修改日预算功能',
        icon: 'none'
      });
    }
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