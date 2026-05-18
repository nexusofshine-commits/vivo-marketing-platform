const app = getApp();

Page({
  data: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号'
  },
  
  onLoad() {
    this.updateData();
  },
  
  onShow() {
    this.updateData();
  },
  
  updateData() {
    this.setData({
      currentAccount: app.globalData.currentAccount,
      accountType: app.globalData.accountType
    });
  },
  
  switchAccount() {
    wx.navigateTo({
      url: '/pages/account-select/account-select'
    });
  },
  
  showMessage(e) {
    const text = e.currentTarget.dataset.text || '';
    wx.showToast({
      title: text || '功能开发中',
      icon: 'none'
    });
  }
})