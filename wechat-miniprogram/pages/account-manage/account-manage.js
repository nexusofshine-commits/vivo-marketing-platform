const app = getApp();

Page({
  data: {
    accountType: '投放账号',
    pageTitle: '推广管理',
    currentStatus: 'all'
  },
  
  onLoad() {
    this.updatePage();
  },
  
  onShow() {
    this.updatePage();
  },
  
  updatePage() {
    const accountType = app.globalData.accountType;
    const pageTitle = accountType === '投放账号' ? '推广管理' : '账户管理';
    
    this.setData({
      accountType: accountType,
      pageTitle: pageTitle
    });
  },
  
  switchStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      currentStatus: status
    });
    
    wx.showToast({
      title: '已筛选' + (status === 'all' ? '全部' : status === 'running' ? '投放中' : status === 'paused' ? '已暂停' : '已结束') + '计划',
      icon: 'none'
    });
  },
  
  goToDetail() {
    wx.navigateTo({
      url: '/pages/plan-detail/plan-detail'
    });
  },
  
  toggleStatus(e) {
    wx.showToast({
      title: '切换计划状态',
      icon: 'none'
    });
  },
  
  editPlan() {
    wx.showToast({
      title: '编辑计划',
      icon: 'none'
    });
  },
  
  copyPlan() {
    wx.showToast({
      title: '复制计划',
      icon: 'none'
    });
  }
})