var app = getApp();

Page({
  data: {},

  goToPromotion: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.selectedAccount = name;
    if (name.indexOf('拉新') !== -1 || name.indexOf('拉活') !== -1) {
      app.globalData.accountType = '投放账号';
    } else if (name.indexOf('主体') !== -1) {
      app.globalData.accountType = '经营主体';
    } else {
      app.globalData.accountType = '多账户管理';
    }
    wx.navigateTo({ url: '/pages/plan-detail/plan-detail' });
  }
})