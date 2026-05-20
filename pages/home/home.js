Page({
  data: {
    accountName: '唯品会拉新A',
    accountType: '投放账号',
    accountTypeTag: '投放账号',
    selectedIndex: 0,
    chartTitle: '曝光量趋势',
    lineAreaHeight: 0,
    lineAreaColor: 'rgba(0,102,255,0.08)',
    chartData: [],
    showMetricPicker: false,
    allMetrics: {},
    selectedMetrics: [],
    topMetrics: [],
    pickerDisplayList: []
  },

  onLoad: function() {
    var app = getApp();
    this.initAllMetrics();
    this.loadSelectedMetrics();

    if (app.globalData && app.globalData.currentAccount) {
      this.setData({ accountName: app.globalData.currentAccount });
    }
    if (app.globalData && app.globalData.accountType) {
      var at = app.globalData.accountType;
      this.setData({
        accountType: at,
        accountTypeTag: at
      });
    }

    this.updateTopMetrics();
    this.updateOverviewMetrics();
  },

  onReady: function() {
    this.buildChartData();
  },

  onShow: function() {
    var app = getApp();
    if (app.globalData && app.globalData.currentAccount) {
      var newName = app.globalData.currentAccount;
      var newType = app.globalData.accountType;
      if (newName !== this.data.accountName || newType !== this.data.accountType) {
        this.setData({
          accountName: newName,
          accountType: newType,
          accountTypeTag: newType
        });
        this.updateTopMetrics();
      }
    }
  },

  initAllMetrics: function() {
    var basicMetrics = [
      { key: 'impression', name: '曝光量', color: '#0066FF', selected: false },
      { key: 'click', name: '点击量', color: '#0066FF', selected: false },
      { key: 'ctr', name: '点击率', color: '#0066FF', selected: false },
      { key: 'cpm', name: '千次展示均价', color: '#0066FF', selected: false },
      { key: 'cpc', name: '点击均价', color: '#0066FF', selected: false },
      { key: 'cost', name: '花费', color: '#0066FF', selected: false },
      { key: 'billing', name: '计费量', color: '#0066FF', selected: false }
    ];

    var appJMetrics = [
      { key: 'j_shallow_conv', name: '浅层转化量（J）', color: '#FF9500', selected: false },
      { key: 'j_shallow_cost', name: '浅层转化成本（J）', color: '#FF9500', selected: false },
      { key: 'j_shallow_rate', name: '浅层转化率（J）', color: '#FF9500', selected: false },
      { key: 'j_deep_conv', name: '深层转化量（J）', color: '#FF9500', selected: false },
      { key: 'j_deep_cost', name: '深层转化成本（J）', color: '#FF9500', selected: false },
      { key: 'j_deep_rate', name: '深层转化率（J）', color: '#FF9500', selected: false },
      { key: 'j_download', name: '下载量(J)', color: '#FF9500', selected: false },
      { key: 'j_download_rate', name: '下载率(J)', color: '#FF9500', selected: false },
      { key: 'j_download_cost', name: '下载成本(J)', color: '#FF9500', selected: false },
      { key: 'j_active', name: '普通激活数(J)', color: '#FF9500', selected: false },
      { key: 'j_active_rate', name: '普通激活率(J)', color: '#FF9500', selected: false },
      { key: 'j_active_cost', name: '普通激活成本(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_active', name: '自定义激活数(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_active_rate', name: '自定义激活率(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_active_cost', name: '自定义激活成本(J)', color: '#FF9500', selected: false },
      { key: 'j_new_active', name: '新增激活数(J)', color: '#FF9500', selected: false },
      { key: 'j_new_active_rate', name: '新增激活率(J)', color: '#FF9500', selected: false },
      { key: 'j_new_active_cost', name: '新增激活成本(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reg', name: '游戏注册量(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reg_rate', name: '游戏注册率(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reg_cost', name: '游戏注册成本(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_reg', name: '自定义注册量(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_reg_rate', name: '自定义注册率(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_reg_cost', name: '自定义注册成本(J)', color: '#FF9500', selected: false },
      { key: 'j_desk', name: '加桌数(J)', color: '#FF9500', selected: false },
      { key: 'j_desk_rate', name: '加桌率(J)', color: '#FF9500', selected: false },
      { key: 'j_desk_cost', name: '加桌成本(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_retain', name: '自定义次留数(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_retain_rate', name: '自定义次留率(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_retain_cost', name: '自定义次留成本(J)', color: '#FF9500', selected: false },
      { key: 'j_game_pay', name: '游戏付费数(J)', color: '#FF9500', selected: false },
      { key: 'j_game_pay_rate', name: '游戏付费率(J)', color: '#FF9500', selected: false },
      { key: 'j_game_pay_cost', name: '游戏付费成本(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d1', name: '自定义付费数-首日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d1_rate', name: '自定义付费率-首日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d1_cost', name: '自定义付费成本首日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d7', name: '自定义付费数-7日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d7_rate', name: '自定义付费率-7日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_pay_d7_cost', name: '自定义付费成本-7日去重(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_wake', name: '自定义拉活(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_wake_rate', name: '自定义拉活率(J)', color: '#FF9500', selected: false },
      { key: 'j_custom_wake_cost', name: '自定义拉活成本(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reserve', name: '游戏预约数(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reserve_rate', name: '游戏预约率(J)', color: '#FF9500', selected: false },
      { key: 'j_game_reserve_cost', name: '游戏预约成本(J)', color: '#FF9500', selected: false },
      { key: 'j_install', name: '安装完成数(J)', color: '#FF9500', selected: false },
      { key: 'j_install_rate', name: '安装完成率(J)', color: '#FF9500', selected: false },
      { key: 'j_install_cost', name: '安装完成成本(J)', color: '#FF9500', selected: false },
      { key: 'j_d1_roi_ad', name: '首日ROI-广告变现(J)', color: '#FF9500', selected: false },
      { key: 'j_d1_roi_pay', name: '首日ROI-充值付费(J)', color: '#FF9500', selected: false },
      { key: 'j_it7', name: 'It7(J)', color: '#FF9500', selected: false }
    ];

    var appZMetrics = [
      { key: 'z_shallow_conv', name: '浅层转化量（Z）', color: '#AF52DE', selected: false },
      { key: 'z_shallow_cost', name: '浅层转化成本（Z）', color: '#AF52DE', selected: false },
      { key: 'z_shallow_rate', name: '浅层转化率（Z）', color: '#AF52DE', selected: false },
      { key: 'z_deep_conv', name: '深层转化量（Z）', color: '#AF52DE', selected: false },
      { key: 'z_deep_cost', name: '深层转化成本（Z）', color: '#AF52DE', selected: false },
      { key: 'z_deep_rate', name: '深层转化率（Z）', color: '#AF52DE', selected: false },
      { key: 'z_download', name: '下载量(Z)', color: '#AF52DE', selected: false },
      { key: 'z_download_rate', name: '下载率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_download_cost', name: '下载成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_active', name: '自定义激活数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_active_rate', name: '自定义激活率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_active_cost', name: '自定义激活成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_new_active', name: '新增激活数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_new_active_rate', name: '新增激活率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_new_active_cost', name: '新增激活成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_active', name: '普通激活数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_active_rate', name: '普通激活率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_active_cost', name: '普通激活成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_reg', name: '游戏注册量(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_reg_rate', name: '游戏注册率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_reg_cost', name: '游戏注册成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_reg', name: '自定义注册量(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_reg_rate', name: '自定义注册率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_reg_cost', name: '自定义注册成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_desk', name: '加桌数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_desk_rate', name: '加桌率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_desk_cost', name: '加桌成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_retain', name: '自定义次留数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_retain_rate', name: '自定义次留率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_custom_retain_cost', name: '自定义次留成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_pay', name: '游戏付费数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_pay_rate', name: '游戏付费率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_game_pay_cost', name: '游戏付费成本(Z)', color: '#AF52DE', selected: false },
      { key: 'z_install', name: '安装完成数(Z)', color: '#AF52DE', selected: false },
      { key: 'z_install_rate', name: '安装完成率(Z)', color: '#AF52DE', selected: false },
      { key: 'z_install_cost', name: '安装完成成本(Z)', color: '#AF52DE', selected: false }
    ];

    var webMetrics = [
      { key: 'web_shallow_conv', name: '浅层转化量', color: '#00C853', selected: false },
      { key: 'web_shallow_cost', name: '浅层转化成本', color: '#00C853', selected: false },
      { key: 'web_shallow_rate', name: '浅层转化率', color: '#00C853', selected: false },
      { key: 'web_deep_conv', name: '深层转化量', color: '#00C853', selected: false },
      { key: 'web_deep_cost', name: '深层转化成本', color: '#00C853', selected: false },
      { key: 'web_deep_rate', name: '深层转化率', color: '#00C853', selected: false },
      { key: 'web_form_submit', name: '表单提交量', color: '#00C853', selected: false },
      { key: 'web_form_rate', name: '表单提交转化率', color: '#00C853', selected: false },
      { key: 'web_form_cost', name: '表单提交成本', color: '#00C853', selected: false },
      { key: 'web_btn_click', name: '按钮点击量', color: '#00C853', selected: false },
      { key: 'web_btn_rate', name: '按钮点击转化率', color: '#00C853', selected: false },
      { key: 'web_btn_cost', name: '按钮点击成本', color: '#00C853', selected: false },
      { key: 'web_qrcode', name: '微信-识别二维码数', color: '#00C853', selected: false },
      { key: 'web_qrcode_rate', name: '微信-识别二维码率', color: '#00C853', selected: false },
      { key: 'web_qrcode_cost', name: '微信-识别二维码成本', color: '#00C853', selected: false },
      { key: 'web_wechat_add', name: '微信添加微信数', color: '#00C853', selected: false },
      { key: 'web_wechat_add_rate', name: '微信添加微信率', color: '#00C853', selected: false },
      { key: 'web_wechat_add_cost', name: '微信添加微信成本', color: '#00C853', selected: false },
      { key: 'web_wechat_msg', name: '微信用户首次消息数', color: '#00C853', selected: false },
      { key: 'web_wechat_msg_rate', name: '微信-用户首次消息率', color: '#00C853', selected: false },
      { key: 'web_wechat_msg_cost', name: '微信-用户首次消息成本', color: '#00C853', selected: false },
      { key: 'web_consult', name: '有效咨询数', color: '#00C853', selected: false },
      { key: 'web_consult_rate', name: '有效咨询率', color: '#00C853', selected: false },
      { key: 'web_consult_cost', name: '有效咨询成本', color: '#00C853', selected: false }
    ];

    var allMetrics = [
      { key: 'basic', name: '基础指标', list: basicMetrics },
      { key: 'appJ', name: '应用转化指标（J）', list: appJMetrics },
      { key: 'appZ', name: '应用转化指标（Z）', list: appZMetrics },
      { key: 'web', name: '网页转化指标', list: webMetrics }
    ];

    this.setData({ allMetrics: allMetrics });
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
    if (metrics && metrics.length > 0) {
      this.setData({ chartTitle: metrics[0].name + '趋势' });
    }
  },

  hexToRgba: function(hex, alpha) {
    var r = 0;
    var g = 0;
    var b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  },

  buildChartData: function() {
    var selectedIndex = this.data.selectedIndex;
    var selectedMetrics = this.data.selectedMetrics;
    if (!selectedMetrics || selectedMetrics.length === 0) return;

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
    var areaColor = this.hexToRgba(color, 0.08);

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
    this.buildChartData();
  },

  openMetricPicker: function() {
    var allMetrics = this.data.allMetrics;
    var selectedMetrics = this.data.selectedMetrics;
    var selectedKeys = {};
    for (var i = 0; i < selectedMetrics.length; i++) {
      selectedKeys[selectedMetrics[i].key] = true;
    }

    var pickerDisplayList = [];
    for (var c = 0; c < allMetrics.length; c++) {
      var category = allMetrics[c];
      var items = [];
      for (var m = 0; m < category.list.length; m++) {
        var metric = category.list[m];
        items.push({
          key: metric.key,
          name: metric.name,
          color: metric.color,
          selected: selectedKeys[metric.key] ? true : false
        });
      }
      pickerDisplayList.push({
        key: category.key,
        name: category.name,
        list: items
      });
    }

    this.setData({
      showMetricPicker: true,
      pickerDisplayList: pickerDisplayList
    });
  },

  closeMetricPicker: function() {
    this.setData({ showMetricPicker: false });
  },

  toggleMetric: function(e) {
    var key = e.currentTarget.dataset.key;
    var catKey = e.currentTarget.dataset.category;
    var pickerDisplayList = this.data.pickerDisplayList;
    var selectedMetrics = this.data.selectedMetrics.slice();
    var allMetrics = this.data.allMetrics;

    var metricInfo = null;
    for (var c = 0; c < allMetrics.length; c++) {
      if (allMetrics[c].key === catKey) {
        for (var m = 0; m < allMetrics[c].list.length; m++) {
          if (allMetrics[c].list[m].key === key) {
            metricInfo = allMetrics[c].list[m];
            break;
          }
        }
      }
      if (metricInfo) break;
    }

    if (!metricInfo) return;

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
        key: metricInfo.key,
        name: metricInfo.name,
        value: '0',
        change: '环比 0.0% -',
        color: metricInfo.color
      });
    }

    var selectedKeys = {};
    for (var s = 0; s < selectedMetrics.length; s++) {
      selectedKeys[selectedMetrics[s].key] = true;
    }

    for (var p = 0; p < pickerDisplayList.length; p++) {
      for (var q = 0; q < pickerDisplayList[p].list.length; q++) {
        pickerDisplayList[p].list[q].selected = selectedKeys[pickerDisplayList[p].list[q].key] ? true : false;
      }
    }

    var newSelectedIndex = this.data.selectedIndex;
    if (newSelectedIndex >= selectedMetrics.length && selectedMetrics.length > 0) {
      newSelectedIndex = 0;
    }

    this.setData({
      selectedMetrics: selectedMetrics,
      pickerDisplayList: pickerDisplayList,
      selectedIndex: newSelectedIndex
    });
  },

  saveMetrics: function() {
    try {
      wx.setStorageSync('selectedMetrics', this.data.selectedMetrics);
    } catch (e) {}
    this.setData({ showMetricPicker: false });
    this.buildChartData();
  },

  topMetricAction: function(e) {
    var action = e.currentTarget.dataset.action;
    if (!action) return;
    if (action === 'goToAccountManage') {
      wx.switchTab({ url: '/pages/account-manage/account-manage' });
    } else if (action === 'editBudget') {
      wx.showToast({ title: '修改日预算功能', icon: 'none' });
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