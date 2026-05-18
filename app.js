App({
  globalData: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号',
    tabTitle: '推广管理'
  },

  onLaunch: function() {
    try {
      var info = wx.getStorageSync('currentAccount');
      if (info) {
        this.globalData.currentAccount = info;
        this.updateAccountType(info);
      }
    } catch (e) {}
  },

  setAccount: function(name) {
    this.globalData.currentAccount = name;
    wx.setStorageSync('currentAccount', name);
    this.updateAccountType(name);
  },

  updateAccountType: function(name) {
    if (name.indexOf('主体') !== -1) {
      this.globalData.accountType = '经营主体';
      this.globalData.tabTitle = '账户管理';
    } else if (name.indexOf('业务') !== -1 || name.indexOf('拉新') !== -1 && name.indexOf('集合') !== -1 || name.indexOf('拉活') !== -1 && name.indexOf('集合') !== -1) {
      this.globalData.accountType = '业务单元';
      this.globalData.tabTitle = '账户管理';
    } else {
      this.globalData.accountType = '投放账号';
      this.globalData.tabTitle = '推广管理';
    }
  }
})