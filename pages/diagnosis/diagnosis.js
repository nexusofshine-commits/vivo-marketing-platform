Page({
  data: {
    currentDim: 'consume',
    currentCards: []
  },

  allCards: {
    consume: [
      {
        id: 'c1', title: '消耗突增预警', level: 'warn', levelText: '预警',
        target: '唯品会拉新A / 信息流计划',
        time: '2024-05-14 14:30', expanded: false,
        detail: '近2小时消耗从¥500/h飙升至¥2,100/h，增幅320%',
        suggestion: '降低出价控制消耗速度',
        action: { name: '调整出价', key: 'adjustBid' }
      },
      {
        id: 'c2', title: '预算不足预警', level: 'warn', levelText: '预警',
        target: '唯品会拉新A / 开屏计划',
        time: '2024-05-14 12:15', expanded: false,
        detail: '今日消耗已达日预算95%，预计14:00前将停止投放',
        suggestion: '增加预算以延长投放时长',
        action: { name: '调整预算', key: 'adjustBudget' }
      },
      {
        id: 'c3', title: '消耗低于预期', level: 'info', levelText: '提示',
        target: '唯品会拉活A / 信息流计划',
        time: '2024-05-14 09:00', expanded: false,
        detail: '今日消耗仅为日预算的30%，曝光量较昨日下降45%',
        suggestion: '提高出价获取更多曝光',
        action: { name: '调整出价', key: 'adjustBid' }
      }
    ],
    convert: [
      {
        id: 'v1', title: '转化成本飙升', level: 'error', levelText: '异常',
        target: '唯品会拉新A / 信息流计划',
        time: '2024-05-14 15:20', expanded: false,
        detail: '激活成本从¥8.5上涨至¥15.2，涨幅78.8%，ROI下降至1.2',
        suggestion: '降低出价控制转化成本',
        action: { name: '调整出价', key: 'adjustBid' }
      },
      {
        id: 'v2', title: 'CTR下降预警', level: 'warn', levelText: '预警',
        target: '唯品会拉新B / Banner计划',
        time: '2024-05-14 14:30', expanded: false,
        detail: '近2小时CTR从1.2%下降至0.8%，下降幅度33.3%',
        suggestion: '调整投放时段优先覆盖高峰',
        action: { name: '调整时段', key: 'adjustTime' }
      },
      {
        id: 'v3', title: '次留率波动', level: 'info', levelText: '提示',
        target: '唯品会拉活A / 全部计划',
        time: '2024-05-14 10:00', expanded: false,
        detail: '近3日次留率从42%波动至38%，低于行业均值40%',
        suggestion: '建议关注落地页体验和用户引导流程',
        action: null
      }
    ],
    creative: [
      {
        id: 'cr1', title: '素材疲劳预警', level: 'warn', levelText: '预警',
        target: '唯品会拉新A / 信息流计划',
        time: '2024-05-14 13:00', expanded: false,
        detail: '3组创意素材已连续投放超过7天，CTR较首日下降52%',
        suggestion: '建议更换新素材保持创意新鲜度',
        action: null
      },
      {
        id: 'cr2', title: '低质创意识别', level: 'warn', levelText: '预警',
        target: '唯品会拉新B / 开屏计划',
        time: '2024-05-14 11:30', expanded: false,
        detail: '2组创意CTR低于0.3%，消耗占比却达18%，拉低整体ROI',
        suggestion: '建议暂停低效创意，转移预算至高转化素材',
        action: null
      }
    ],
    account: [
      {
        id: 'a1', title: '账户资质即将过期', level: 'error', levelText: '异常',
        target: '唯品会主体管理员',
        time: '2024-05-12 16:45', expanded: false,
        detail: '营业执照将于3天后过期，过期后所有计划将自动暂停',
        suggestion: '请尽快提交最新营业执照照片',
        action: null
      },
      {
        id: 'a2', title: '余额不足预警', level: 'warn', levelText: '预警',
        target: '唯品会拉新A',
        time: '2024-05-14 08:00', expanded: false,
        detail: '当前余额¥2,350，按近期消耗速度预计2天后将耗尽',
        suggestion: '建议及时充值避免计划暂停',
        action: null
      },
      {
        id: 'a3', title: '系统维护通知', level: 'info', levelText: '提示',
        target: '全部账号',
        time: '2024-05-13 18:00', expanded: false,
        detail: '系统将于5月15日02:00-04:00进行例行维护，期间数据可能延迟更新',
        suggestion: '维护期间请关注数据恢复情况，无需操作',
        action: null
      }
    ]
  },

  onLoad: function() {
    this.switchDim({ currentTarget: { dataset: { dim: 'consume' } } });
  },

  onShow: function() {
    var tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.updateSelected(2);
    }
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
    var msgs = {
      'adjustBudget': '正在打开预算调整...',
      'adjustBid': '正在打开出价调整...',
      'adjustTime': '正在打开时段调整...'
    };
    wx.showToast({ title: msgs[key] || '正在处理...', icon: 'loading', duration: 1500 });
  }
});