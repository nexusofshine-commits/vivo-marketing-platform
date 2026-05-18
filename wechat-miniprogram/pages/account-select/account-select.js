const app = getApp();

Page({
  data: {
    
  },
  
  selectAccount(e) {
    const accountName = e.currentTarget.dataset.name;
    const account = app.globalData;
    
    if (accountName.includes('拉新') || accountName.includes('拉活')) {
      account.accountType = '投放账号';
    } else if (accountName.includes('主体')) {
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
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }, 1500);
  }
})