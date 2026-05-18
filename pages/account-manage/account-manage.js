var app = getApp();

Page({
  data: {
    isMultiAccount: true,
    accountCount: '5',
    runningCount: '3',
    todayCost: '¥36,257',
    adAccounts: [],
    multiAccounts: [],
    planCount: '3',
    runningPlans: '2',
    planList: []
  },

  onShow: function() {
    var type = app.globalData.accountType;
    var isMulti = type !== '投放账号';
    this.setData({ isMultiAccount: isMulti });

    if (isMulti) {
      this.buildAccountList(type);
    } else {
      this.buildPlanList();
    }
  },

  buildAccountList: function(type) {
    var adAccounts = [
      { name: '唯品会拉新A', meta: '今日 ¥15,234 · OCPC', iconBg: '#E8F0FF', iconColor: '#0F62FE', statusText: '投放中', statusClass: 'running' },
      { name: '唯品会拉新B', meta: '今日 ¥8,567 · OCPC', iconBg: '#E8F0FF', iconColor: '#0F62FE', statusText: '投放中', statusClass: 'running' },
      { name: '唯品会拉活A', meta: '今日 ¥12,456 · OCPC', iconBg: '#FFF3E0', iconColor: '#FF832B', statusText: '已暂停', statusClass: 'paused' }
    ];
    var multiAccounts = [];
    if (type === '经营主体') {
      multiAccounts = [
        { name: '唯品会OCPC账户集合', meta: '3个子账户 · 今日 ¥36,257' },
        { name: '唯品会拉活账户集合', meta: '2个子账户 · 今日 ¥12,456' }
      ];
    } else {
      multiAccounts = [
        { name: '唯品会OCPC账户集合', meta: '3个子账户 · 今日 ¥36,257' }
      ];
    }
    this.setData({
      adAccounts: adAccounts,
      multiAccounts: multiAccounts,
      accountCount: type === '经营主体' ? '5' : '3',
      runningCount: '2',
      todayCost: '¥36,257'
    });
  },

  buildPlanList: function() {
    var name = app.globalData.currentAccount;
    var plans = [
      { name: name + '-信息流计划', type: 'OCPC', statusText: '投放中', cost: '15,234', iconBg: '#E8F0FF' },
      { name: name + '-开屏计划', type: 'OCPC', statusText: '投放中', cost: '8,567', iconBg: '#E8F0FF' },
      { name: name + '-Banner计划', type: 'CPC', statusText: '已暂停', cost: '3,456', iconBg: '#FFF3E0' }
    ];
    this.setData({
      planList: plans,
      planCount: '3',
      runningPlans: '2',
      todayCost: '¥27,257'
    });
  },

  goToPromotion: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.selectedAccount = name;
    app.globalData.accountType = '投放账号';
    wx.navigateTo({ url: '/pages/plan-detail/plan-detail' });
  },

  goToPlanDetail: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.selectedAccount = name;
    wx.navigateTo({ url: '/pages/plan-detail/plan-detail' });
  }
})