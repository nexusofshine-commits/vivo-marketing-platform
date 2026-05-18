Page({
  data: {
    currentDim: 'consume',
    currentCards: []
  },

  allCards: {
    consume: [
      {
        id: 'c1', title: '消耗突增预警', level: 'warn', levelText: '预警',
        time: '2024-05-14 14:30', expanded: false,
        detail: '近2小时消耗从¥500/h飙升至¥2,100/h，增幅320%，主要集中在信息流计划',
        suggestion: '建议检查是否出价异常或流量波动，可适当降低出价控制消耗速度',
        actions: [
          { name: '调整预算', key: 'adjustBudget', type: 'primary' },
          { name: '调整出价', key: 'adjustBid', type: 'primary' },
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      },
      {
        id: 'c2', title: '预算不足预警', level: 'warn', levelText: '预警',
        time: '2024-05-14 12:15', expanded: false,
        detail: '计划「拉新A」今日消耗已达日预算95%，预计14:00前将停止投放',
        suggestion: '建议增加预算以延长投放时长，或调整投放时段优先覆盖高峰',
        actions: [
          { name: '调整预算', key: 'adjustBudget', type: 'primary' },
          { name: '调整时段', key: 'adjustTime', type: 'primary' },
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      },
      {
        id: 'c3', title: '消耗低于预期', level: 'info', levelText: '提示',
        time: '2024-05-14 09:00', expanded: false,
        detail: '计划「拉活A」今日消耗仅为日预算的30%，曝光量较昨日下降45%',
        suggestion: '建议检查定向是否过窄或出价过低，可适当扩大定向范围',
        actions: [
          { name: '调整出价', key: 'adjustBid', type: 'primary' },
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      }
    ],
    convert: [
      {
        id: 'v1', title: '转化成本飙升', level: 'error', levelText: '异常',
        time: '2024-05-14 15:20', expanded: false,
        detail: '激活成本从¥8.5上涨至¥15.2，涨幅78.8%，ROI下降至1.2',
        suggestion: '建议暂停高成本创意，降低出价或调整定向人群',
        actions: [
          { name: '调整出价', key: 'adjustBid', type: 'primary' },
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      },
      {
        id: 'v2', title: 'CTR下降预警', level: 'warn', levelText: '预警',
        time: '2024-05-14 14:30', expanded: false,
        detail: '近2小时CTR从1.2%下降至0.8%，下降幅度33.3%，主要集中在移动端',
        suggestion: '建议检查素材是否过时，更新创意素材或提高出价获取优质流量',
        actions: [
          { name: '调整出价', key: 'adjustBid', type: 'primary' },
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      },
      {
        id: 'v3', title: '次留率波动', level: 'info', levelText: '提示',
        time: '2024-05-14 10:00', expanded: false,
        detail: '近3日次留率从42%波动至38%，低于行业均值40%',
        suggestion: '建议优化落地页体验和用户引导流程，提升用户留存',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      }
    ],
    creative: [
      {
        id: 'cr1', title: '素材疲劳预警', level: 'warn', levelText: '预警',
        time: '2024-05-14 13:00', expanded: false,
        detail: '3组创意素材已连续投放超过7天，CTR较首日下降52%',
        suggestion: '建议更换新素材，保持创意新鲜度以维持点击率',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      },
      {
        id: 'cr2', title: '低质创意识别', level: 'warn', levelText: '预警',
        time: '2024-05-14 11:30', expanded: false,
        detail: '2组创意CTR低于0.3%，消耗占比却达18%，拉低整体ROI',
        suggestion: '建议暂停低效创意，将预算转移至高转化素材',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      }
    ],
    account: [
      {
        id: 'a1', title: '账户资质即将过期', level: 'error', levelText: '异常',
        time: '2024-05-12 16:45', expanded: false,
        detail: '营业执照将于3天后过期，过期后所有计划将自动暂停',
        suggestion: '请尽快在账户中心提交最新营业执照照片',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'primary' }
        ]
      },
      {
        id: 'a2', title: '余额不足预警', level: 'warn', levelText: '预警',
        time: '2024-05-14 08:00', expanded: false,
        detail: '当前余额¥2,350，按近期消耗速度预计2天后将耗尽',
        suggestion: '建议及时充值，避免计划因余额不足而暂停',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'primary' }
        ]
      },
      {
        id: 'a3', title: '系统维护通知', level: 'info', levelText: '提示',
        time: '2024-05-13 18:00', expanded: false,
        detail: '系统将于5月15日02:00-04:00进行例行维护，期间数据可能延迟更新',
        suggestion: '维护期间请关注数据恢复情况，无需操作',
        actions: [
          { name: '前往网页端', key: 'goWeb', type: 'outline' }
        ]
      }
    ]
  },

  onLoad: function() {
    this.switchDim({ currentTarget: { dataset: { dim: 'consume' } } });
  },

  switchDim: function(e) {
    var dim = e.currentTarget.dataset.dim;
    this.setData({
      currentDim: dim,
      currentCards: this.allCards[dim] || []
    });
  },

  toggleCard: function(e) {
    var id = e.currentTarget.dataset.id;
    var list = this.data.currentCards;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].expanded = !list[i].expanded;
        break;
      }
    }
    this.setData({ currentCards: list });
  },

  handleAction: function(e) {
    var key = e.currentTarget.dataset.action;
    if (key === 'goWeb') {
      wx.showToast({ title: '请前往网页端操作', icon: 'none' });
      return;
    }
    var msgs = {
      'adjustBudget': '正在打开预算调整...',
      'adjustBid': '正在打开出价调整...',
      'adjustTime': '正在打开时段调整...'
    };
    wx.showToast({ title: msgs[key] || '正在处理...', icon: 'loading', duration: 1500 });
  }
});