var app = getApp();

Page({
  data: {
    currentTab: 'business',
    businessList: [],
    unitList: [],
    accountList: [],
    businessCount: 0,
    unitCount: 0,
    accountCount: 0
  },

  onLoad: function() {
    this.loadAccountData();
  },

  loadAccountData: function() {
    var businessData = [
      { name: '唯品会主体', accountCount: 2, totalAccounts: 5 }
    ];
    
    var unitData = [
      { name: '拉新业务线', accountCount: 3, cost: '¥23,801' },
      { name: '拉活业务线', accountCount: 2, cost: '¥12,456' }
    ];
    
    var accountData = [
      { name: '唯品会拉新A', cost: '¥15,234', type: 'OCPC', statusText: '投放中', statusClass: 'running' },
      { name: '唯品会拉新B', cost: '¥8,567', type: 'OCPC', statusText: '投放中', statusClass: 'running' },
      { name: '唯品会拉活A', cost: '¥12,456', type: 'OCPC', statusText: '已暂停', statusClass: 'paused' }
    ];

    this.setData({
      businessList: businessData,
      unitList: unitData,
      accountList: accountData,
      businessCount: businessData.length,
      unitCount: unitData.length,
      accountCount: accountData.length
    });
  },

  switchTab: function(e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
  },

  selectAccount: function(e) {
    var name = e.currentTarget.dataset.name;
    var type = e.currentTarget.dataset.type;
    app.globalData.currentAccount = name;
    app.globalData.accountType = type;
    app.globalData.tabTitle = type === '投放账号' ? '推广管理' : '投放账号管理';
    wx.setStorageSync('currentAccount', name);

    wx.showToast({ title: '已切换至 ' + name, icon: 'success', duration: 1500 });

    setTimeout(function() {
      wx.switchTab({ url: '/pages/home/home' });
    }, 1200);
  },

  goToBind: function() {
    wx.navigateTo({ url: '/pages/account-bind/account-bind' });
  }
})