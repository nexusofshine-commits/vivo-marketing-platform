var app = getApp();

Page({
  data: {
    currentAccount: '唯品会拉新A',
    accountType: '投放账号'
  },
  
  onLoad: function() {
    this.updateData();
  },
  
  onShow: function() {
    this.updateData();
  },
  
  updateData: function() {
    this.setData({
      currentAccount: app.globalData.currentAccount,
      accountType: app.globalData.accountType
    });
  },
  
  switchAccount: function() {
    wx.navigateTo({
      url: '/pages/account-select/account-select'
    });
  },
  
  showMessage: function(e) {
    var text = e.currentTarget.dataset.text || '';
    wx.showToast({
      title: text || '功能开发中',
      icon: 'none'
    });
  }
})
