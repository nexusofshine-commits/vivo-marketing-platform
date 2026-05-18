App({
  globalData: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号'
  },

  onLaunch: function() {
    try {
      var info = wx.getStorageSync('currentAccount');
      if (info) {
        this.globalData.currentAccount = info;
      }
    } catch (e) {}
  },

  setAccount: function(name) {
    this.globalData.currentAccount = name;
    wx.setStorageSync('currentAccount', name);
    if (name.indexOf('拉新') !== -1 || name.indexOf('拉活') !== -1) {
      this.globalData.accountType = '投放账号';
    } else if (name.indexOf('主体') !== -1) {
      this.globalData.accountType = '经营主体';
    } else {
      this.globalData.accountType = '多账户管理';
    }
  }
})