var app = getApp();

Page({
  data: {
    accountType: '投放账号',
    pageTitle: '推广管理',
    currentStatus: 'all'
  },
  
  onLoad: function() {
    this.updatePage();
  },
  
  onShow: function() {
    this.updatePage();
  },
  
  updatePage: function() {
    var accountType = app.globalData.accountType;
    var pageTitle = accountType === '投放账号' ? '推广管理' : '账户管理';
    
    this.setData({
      accountType: accountType,
      pageTitle: pageTitle
    });
  },
  
  switchStatus: function(e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentStatus: status
    });
    
    var statusText = '全部';
    if (status === 'running') {
      statusText = '投放中';
    } else if (status === 'paused') {
      statusText = '已暂停';
    } else if (status === 'ended') {
      statusText = '已结束';
    }
    
    wx.showToast({
      title: '已筛选' + statusText + '计划',
      icon: 'none'
    });
  },
  
  goToDetail: function() {
    wx.navigateTo({
      url: '/pages/plan-detail/plan-detail'
    });
  },
  
  toggleStatus: function(e) {
    wx.showToast({
      title: '切换计划状态',
      icon: 'none'
    });
  },
  
  editPlan: function() {
    wx.showToast({
      title: '编辑计划',
      icon: 'none'
    });
  },
  
  copyPlan: function() {
    wx.showToast({
      title: '复制计划',
      icon: 'none'
    });
  }
})
