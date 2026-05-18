App({
  globalData: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号',
    trendData: {
      labels: ['05-12', '05-13', '05-14', '05-15', '05-16', '05-17', '05-18'],
      spend: [12500, 14200, 13800, 15600, 14900, 15300, 15234],
      exposure: [2450000, 2680000, 2520000, 2890000, 2760000, 2840000, 2845000],
      click: [108000, 119000, 112000, 128000, 122000, 126000, 126000],
      ctr: [4.41, 4.44, 4.44, 4.43, 4.42, 4.44, 4.43]
    },
    conversionData: {
      labels: ['05-12', '05-13', '05-14', '05-15', '05-16', '05-17', '05-18'],
      activation: [2800, 3200, 2950, 3450, 3100, 3350, 3245],
      retention: [1580, 1800, 1660, 1940, 1750, 1890, 1826]
    }
  },
  
  onLaunch() {
    const accountInfo = wx.getStorageSync('currentAccount') || '唯品会拉新A';
    this.globalData.currentAccount = accountInfo;
    
    if (accountInfo.includes('拉新') || accountInfo.includes('拉活')) {
      this.globalData.accountType = '投放账号';
    } else if (accountInfo.includes('主体')) {
      this.globalData.accountType = '经营主体';
    } else {
      this.globalData.accountType = '多账户管理';
    }
  },
  
  setAccount(accountName) {
    this.globalData.currentAccount = accountName;
    wx.setStorageSync('currentAccount', accountName);
    
    if (accountName.includes('拉新') || accountName.includes('拉活')) {
      this.globalData.accountType = '投放账号';
    } else if (accountName.includes('主体')) {
      this.globalData.accountType = '经营主体';
    } else {
      this.globalData.accountType = '多账户管理';
    }
  }
})