Page({
  data: {
    warnings: [
      {
        id: 1,
        title: 'CTR下降预警',
        time: '2024-05-14 14:30',
        expanded: false,
        dataDetail: '近2小时CTR从1.2%下降至0.8%，下降幅度33.3%，主要集中在移动端流量',
        suggestion: '建议检查素材是否过时，可尝试更新创意素材，或者适当提高出价来获得更好的曝光位置'
      },
      {
        id: 2,
        title: '计划消耗异常',
        time: '2024-05-14 12:15',
        expanded: false,
        dataDetail: '计划「新品推广」今日消耗已达日预算的95%，但转化成本比目标高20%',
        suggestion: '可以适当降低出价或调整定向，同时密切关注转化情况，必要时可增加预算'
      }
    ],
    notices: [
      {
        id: 1,
        title: '新功能上线：智能出价',
        time: '2024-05-14 09:00',
        expanded: false,
        content: '系统推出智能出价功能，基于机器学习自动调整出价，帮助您获得更好的转化效果'
      },
      {
        id: 2,
        title: '系统维护通知',
        time: '2024-05-13 18:00',
        expanded: false,
        content: '系统将于5月15日02:00-04:00进行例行维护，期间可能影响数据更新'
      }
    ],
    problems: [
      {
        id: 1,
        title: '账户资质即将过期',
        time: '2024-05-12 16:45',
        expanded: false,
        dataDetail: '您的账户营业执照将于3天后过期，请及时更新资质信息以免影响推广',
        suggestion: '请在账户中心-资质管理中提交最新的营业执照照片，审核通过后即可恢复正常使用'
      }
    ]
  },

  toggleDetail: function(e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var key = type === 'warning' ? 'warnings' : type === 'notice' ? 'notices' : 'problems';
    var list = this.data[key];
    list[index].expanded = !list[index].expanded;
    var data = {};
    data[key] = list;
    this.setData(data);
  },

  handleAction: function(e) {
    var action = e.currentTarget.dataset.action;
    var actionMessages = {
      'adjustBudget': '正在打开预算调整页面...',
      'adjustBid': '正在打开出价调整页面...',
      'viewDetails': '正在查看详细数据...',
      'tryNow': '正在跳转至新功能...',
      'learnMore': '正在打开帮助文档...',
      'pauseAll': '正在暂停所有计划...',
      'enableAll': '正在启用所有计划...',
      'contactSupport': '正在连接客服...'
    };

    wx.showToast({
      title: actionMessages[action] || '正在处理...',
      icon: 'loading',
      duration: 1500
    });

    var that = this;
    setTimeout(function() {
      wx.showToast({
        title: '操作成功',
        icon: 'success'
      });
    }, 1500);
  }
});
