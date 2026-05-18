App({
  globalData: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号'
  },

  onLaunch: function() {
    var accountInfo = wx.getStorageSync('currentAccount') || '唯品会拉新A';
    this.globalData.currentAccount = accountInfo;

    if (accountInfo.indexOf('拉新') !== -1 || accountInfo.indexOf('拉活') !== -1) {
      this.globalData.accountType = '投放账号';
    } else if (accountInfo.indexOf('主体') !== -1) {
      this.globalData.accountType = '经营主体';
    } else {
      this.globalData.accountType = '多账户管理';
    }
  },

  setAccount: function(accountName) {
    this.globalData.currentAccount = accountName;
    wx.setStorageSync('currentAccount', accountName);

    if (accountName.indexOf('拉新') !== -1 || accountName.indexOf('拉活') !== -1) {
      this.globalData.accountType = '投放账号';
    } else if (accountName.indexOf('主体') !== -1) {
      this.globalData.accountType = '经营主体';
    } else {
      this.globalData.accountType = '多账户管理';
    }
  }
})