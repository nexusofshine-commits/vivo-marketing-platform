var app = getApp();

Page({
  data: {},

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
  }
})