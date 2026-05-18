var app = getApp();

Page({
  data: {
    
  },
  
  selectAccount: function(e) {
    var accountName = e.currentTarget.dataset.name;
    var account = app.globalData;
    
    if (accountName.indexOf('拉新') !== -1 || accountName.indexOf('拉活') !== -1) {
      account.accountType = '投放账号';
    } else if (accountName.indexOf('主体') !== -1) {
      account.accountType = '经营主体';
    } else {
      account.accountType = '多账户管理';
    }
    
    app.setAccount(accountName);
    
    wx.showToast({
      title: '已切换至 ' + accountName,
      icon: 'success',
      duration: 2000
    });
    
    var that = this;
    setTimeout(function() {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }, 1500);
  }
})
