var app = getApp();

var PROMO_DATA = {
  new: {
    plan: [
      { name: '拉新-信息流计划', type: 'OCPC', statusText: '投放中', cost: '15,234', iconBg: '#E8F0FF', dailyBudget: 10000 },
      { name: '拉新-开屏计划', type: 'OCPC', statusText: '投放中', cost: '8,567', iconBg: '#E8F0FF', dailyBudget: 8000 },
      { name: '拉新-Banner计划', type: 'CPC', statusText: '已暂停', cost: '3,456', iconBg: '#FFF3E0', dailyBudget: 5000 }
    ],
    ad: [
      { name: '信息流-广告A', type: 'OCPC', statusText: '投放中', cost: '9,120', iconBg: '#E8F0FF', bidPrice: 0.5 },
      { name: '信息流-广告B', type: 'OCPC', statusText: '投放中', cost: '6,114', iconBg: '#E8F0FF', bidPrice: 0.6 },
      { name: '开屏-广告A', type: 'OCPC', statusText: '投放中', cost: '8,567', iconBg: '#E8F0FF', bidPrice: 2.0 }
    ],
    material: [
      { name: '素材组-大图系列', type: '图片', statusText: '使用中', cost: '-', iconBg: '#E8F5E9' },
      { name: '素材组-视频系列', type: '视频', statusText: '使用中', cost: '-', iconBg: '#E8F5E9' },
      { name: '素材组-组图系列', type: '图片', statusText: '已暂停', cost: '-', iconBg: '#FFF3E0' }
    ]
  },
  old: {
    plan: [
      { name: '拉新-信息流计划', type: 'CPC', statusText: '投放中', cost: '15,234', iconBg: '#E8F0FF', dailyBudget: 10000 },
      { name: '拉新-开屏计划', type: 'CPM', statusText: '投放中', cost: '8,567', iconBg: '#E8F0FF', dailyBudget: 8000 },
      { name: '拉新-Banner计划', type: 'CPC', statusText: '已暂停', cost: '3,456', iconBg: '#FFF3E0', dailyBudget: 5000 }
    ],
    adgroup: [
      { name: '信息流-广告组1', type: 'CPC', statusText: '投放中', cost: '9,120', iconBg: '#E8F0FF', bidPrice: 0.5 },
      { name: '信息流-广告组2', type: 'CPC', statusText: '投放中', cost: '6,114', iconBg: '#E8F0FF', bidPrice: 0.6 }
    ],
    ad: [
      { name: '广告组1-广告A', type: 'CPC', statusText: '投放中', cost: '5,230', iconBg: '#E8F0FF', bidPrice: 0.4 },
      { name: '广告组1-广告B', type: 'CPC', statusText: '投放中', cost: '3,890', iconBg: '#E8F0FF', bidPrice: 0.5 },
      { name: '广告组2-广告A', type: 'CPC', statusText: '投放中', cost: '6,114', iconBg: '#E8F0FF', bidPrice: 0.6 }
    ],
    creative: [
      { name: '创意-大图A', type: '图片', statusText: '使用中', cost: '-', iconBg: '#E8F5E9' },
      { name: '创意-视频A', type: '视频', statusText: '使用中', cost: '-', iconBg: '#E8F5E9' }
    ]
  }
};

var TAB_LABELS = { plan: '计划', ad: '广告', material: '素材', adgroup: '广告组', creative: '创意' };

Page({
  data: {
    viewLevel: 'businessUnit',
    pageTitle: '投放账号管理',
    businessUnits: [],
    accountList: [],
    allAccounts: [],
    filterKey: 'all',
    runningCount: '2',
    promoVersion: 'new',
    promoTab: 'plan',
    promoTabLabel: '计划',
    promoList: [],
    promoRunning: '2',
    showEditModal: false,
    editType: '',
    editItem: null,
    editValue: ''
  },

  onShow: function() {
    var type = app.globalData.accountType;
    if (type === '经营主体') {
      this.setData({ viewLevel: 'businessUnit', pageTitle: '投放账号管理' });
      this.buildBusinessUnits();
    } else if (type === '业务单元') {
      this.setData({ viewLevel: 'adAccount', pageTitle: '投放账号管理' });
      this.buildAccountList();
    } else {
      this.setData({ viewLevel: 'promotion', pageTitle: '推广管理' });
      this.buildPromoList();
    }
  },

  buildBusinessUnits: function() {
    this.setData({
      businessUnits: [
        { name: '拉新业务线', accountCount: 3, cost: '¥23,801', iconBg: '#E8F5E9', iconColor: '#2E7D32' },
        { name: '拉活业务线', accountCount: 2, cost: '¥12,456', iconBg: '#FFF3E0', iconColor: '#FF832B' }
      ]
    });
  },

  enterBusinessUnit: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.currentBusinessUnit = name;
    this.setData({ viewLevel: 'adAccount' });
    this.buildAccountList();
  },

  buildAccountList: function() {
    var all = [
      { name: '唯品会拉新A', cost: '¥15,234', type: 'OCPC', statusText: '投放中', statusClass: 'running', iconBg: '#E8F0FF', focus: true },
      { name: '唯品会拉新B', cost: '¥8,567', type: 'OCPC', statusText: '投放中', statusClass: 'running', iconBg: '#E8F0FF', focus: true },
      { name: '唯品会拉活A', cost: '¥12,456', type: 'OCPC', statusText: '已暂停', statusClass: 'paused', iconBg: '#FFF3E0', focus: false }
    ];
    this.setData({ allAccounts: all, accountList: all, filterKey: 'all', runningCount: '2' });
  },

  filterAccounts: function(e) {
    var key = e.currentTarget.dataset.key;
    var list = this.data.allAccounts;
    if (key === 'focus') {
      var filtered = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].focus) filtered.push(list[i]);
      }
      list = filtered;
    }
    this.setData({ filterKey: key, accountList: list });
  },

  enterPromotion: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.selectedAccount = name;
    this.setData({ viewLevel: 'promotion', pageTitle: '推广管理' });
    this.buildPromoList();
  },

  buildPromoList: function() {
    var ver = this.data.promoVersion;
    var tab = this.data.promoTab;
    var list = (PROMO_DATA[ver] && PROMO_DATA[ver][tab]) || [];
    var running = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].statusText === '投放中' || list[i].statusText === '使用中') running++;
    }
    this.setData({ promoList: list, promoRunning: String(running), promoTabLabel: TAB_LABELS[tab] || tab });
  },

  switchVersion: function(e) {
    var ver = e.currentTarget.dataset.ver;
    var tab = ver === 'new' ? 'plan' : 'plan';
    this.setData({ promoVersion: ver, promoTab: tab });
    this.buildPromoList();
  },

  switchPromoTab: function(e) {
    this.setData({ promoTab: e.currentTarget.dataset.tab });
    this.buildPromoList();
  },

  goToPlanDetail: function(e) {
    var name = e.currentTarget.dataset.name;
    app.globalData.selectedAccount = name;
    wx.navigateTo({ url: '/pages/plan-detail/plan-detail' });
  },

  openEditModal: function(e) {
    var item = e.currentTarget.dataset.item;
    var type = e.currentTarget.dataset.type;
    var value = type === 'budget' ? (item.dailyBudget || 0) : (item.bidPrice || 0);
    this.setData({
      showEditModal: true,
      editType: type,
      editItem: item,
      editValue: String(value)
    });
  },

  closeEditModal: function() {
    this.setData({ showEditModal: false, editItem: null, editValue: '' });
  },

  onEditValueInput: function(e) {
    this.setData({ editValue: e.detail.value });
  },

  saveEdit: function() {
    var val = parseFloat(this.data.editValue);
    if (isNaN(val) || val <= 0) {
      wx.showToast({ title: '请输入有效数值', icon: 'none' });
      return;
    }

    var type = this.data.editType;
    var item = this.data.editItem;
    if (type === 'budget') {
      item.dailyBudget = val;
    } else if (type === 'bid') {
      item.bidPrice = val;
    }

    // 更新数据
    this.buildPromoList();

    this.setData({ showEditModal: false, editItem: null, editValue: '' });
    wx.showToast({ title: '保存成功', icon: 'success' });
  }
})