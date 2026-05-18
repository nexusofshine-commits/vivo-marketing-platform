Page({
  data: {
    warnings: [
      { id: 1, title: 'CTR下降预警', time: '2024-05-14 14:30', expanded: false },
      { id: 2, title: '计划消耗异常', time: '2024-05-14 12:15', expanded: false }
    ],
    notices: [
      { id: 1, title: '新功能上线：智能出价', time: '2024-05-14 09:00', expanded: false },
      { id: 2, title: '系统维护通知', time: '2024-05-13 18:00', expanded: false }
    ],
    problems: [
      { id: 1, title: '账户资质即将过期', time: '2024-05-12 16:45', expanded: false }
    ],
    detailCache: {}
  },

  toggleDetail: function(e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var key = type === 'warning' ? 'warnings' : type === 'notice' ? 'notices' : 'problems';
    var list = this.data[key];
    var item = list[index];
    var cacheKey = type + '_' + item.id;

    if (!item.expanded) {
      if (this.data.detailCache[cacheKey]) {
        item.expanded = true;
        item.dataDetail = this.data.detailCache[cacheKey].dataDetail;
        item.suggestion = this.data.detailCache[cacheKey].suggestion;
        item.content = this.data.detailCache[cacheKey].content;
      } else {
        var detailData = this.getDetailData(type, item.id);
        item.expanded = true;
        item.dataDetail = detailData.dataDetail;
        item.suggestion = detailData.suggestion;
        item.content = detailData.content;
        this.data.detailCache[cacheKey] = detailData;
      }
    } else {
      item.expanded = false;
    }

    var data = {};
    data[key] = list;
    this.setData(data);
  },

  getDetailData: function(type, id) {
    if (type === 'warning') {
      if (id === 1) {
        return {
          dataDetail: '近2小时CTR从1.2%下降至0.8%，下降幅度33.3%',
          suggestion: '建议检查素材是否过时，尝试更新创意素材'
        };
      }
      return {
        dataDetail: '计划今日消耗已达日预算95%，转化成本比目标高20%',
        suggestion: '可适当降低出价或调整定向，密切关注转化情况'
      };
    }
    if (type === 'notice') {
      if (id === 1) {
        return {
          content: '系统推出智能出价功能，基于机器学习自动调整出价'
        };
      }
      return {
        content: '系统将于5月15日02:00-04:00进行例行维护'
      };
    }
    return {
      dataDetail: '您的账户营业执照将于3天后过期',
      suggestion: '请在账户中心-资质管理中提交最新营业执照照片'
    };
  },

  handleAction: function(e) {
    var action = e.currentTarget.dataset.action;
    var msgs = {
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
      title: msgs[action] || '正在处理...',
      icon: 'loading',
      duration: 1500
    });
  }
});
