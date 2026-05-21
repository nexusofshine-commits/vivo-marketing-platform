Page({
  data: {
    planName: '',
    planStatus: '',
    version: 'new',
    levelType: 'plan',
    trendExpanded: false,
    targetingExpanded: false,
    coreMetrics: [],
    trendData: [],
    lineAreaHeight: 0,
    lineAreaColor: 'rgba(0,102,255,0.06)',
    infoFields: [],
    creativeInfo: {},
    targetingInfo: '',
    showEditModal: false,
    editType: '',
    editField: '',
    editValue: ''
  },

  onLoad: function(options) {
    var version = options.version || 'new';
    var levelType = options.levelType || 'plan';
    var planName = options.name || '计划详情';

    this.setData({
      version: version,
      levelType: levelType,
      planName: planName,
      planStatus: '投放中'
    });

    this.initCoreMetrics();
    this.initInfoFields();
    this.initTrendData();
  },

  initCoreMetrics: function() {
    this.setData({
      coreMetrics: [
        { key: 'cost', name: '花费', value: '1,280.50' },
        { key: 'impression', name: '曝光量', value: '56,789' },
        { key: 'click', name: '点击量', value: '1,234' },
        { key: 'ctr', name: '点击率', value: '2.17%' },
        { key: 'convert', name: '转化量', value: '89' },
        { key: 'convertCost', name: '转化成本', value: '14.39' }
      ]
    });
  },

  initInfoFields: function() {
    var version = this.data.version;
    var levelType = this.data.levelType;
    var fields = [];

    if (version === 'new') {
      if (levelType === 'plan') {
        fields = [
          { label: '推广目标', value: '应用推广' },
          { label: '应用名称', value: '唯品会' },
          { label: '包名', value: 'com.achievo.vipshop' },
          { label: '行业', value: '电商购物' },
          { label: '通投智选', value: '开启', highlight: true },
          { label: '出价方式', value: '按转化目标出价' },
          { key: 'bidPrice', label: '优化目标及出价', value: '10', editable: true },
          { key: 'dailyBudget', label: '计划预算', value: '5000', editable: true },
          { label: '投放日期', value: '2025-05-01 ~ 2025-06-30' },
          { label: '投放时段', value: '全天' },
          { label: '定向信息', value: '展开查看', isTargeting: true }
        ];
      } else if (levelType === 'ad') {
        this.setData({
          creativeInfo: {
            title: '夏日特惠-唯品会专场',
            images: [
              'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vivo%20ad%20banner%20fashion%20sale%20bright%20colorful&image_size=square',
              'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vivo%20ad%20banner%20discount%20shopping%20modern&image_size=square'
            ],
            video: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vivo%20ad%20video%20thumbnail%20play%20button%20overlay&image_size=landscape_16_9',
            groupImages: []
          }
        });
      }
    } else {
      if (levelType === 'plan') {
        fields = [
          { label: '推广目标', value: '应用推广' },
          { label: '计划类型', value: '商店' },
          { key: 'dailyBudget', label: '日预算', value: '5000', editable: true }
        ];
      } else if (levelType === 'adgroup') {
        fields = [
          { label: '应用名称', value: '唯品会' },
          { label: '包名', value: 'com.achievo.vipshop' },
          { label: '行业', value: '电商购物' },
          { label: '通投智选', value: '开启', highlight: true },
          { label: '出价方式', value: '按转化目标出价' },
          { key: 'bidPrice', label: '优化目标及出价', value: '10', editable: true },
          { key: 'dailyBudget', label: '日预算', value: '5000', editable: true },
          { label: '投放日期', value: '2025-05-01 ~ 2025-06-30' },
          { label: '投放时段', value: '全天' },
          { label: '定向信息', value: '展开查看', isTargeting: true }
        ];
      } else if (levelType === 'creative') {
        this.setData({
          creativeInfo: {
            title: '夏日特惠-唯品会专场',
            images: [
              'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vivo%20ad%20creative%20banner%20sale%20promotion&image_size=square'
            ]
          }
        });
      }
    }

    if (fields.length > 0) {
      this.setData({ infoFields: fields });
    }

    this.setData({ targetingInfo: '性别：不限\n年龄：18-45岁\n地域：全国\n兴趣：电商购物、时尚穿搭、品牌折扣\n网络：WiFi/4G/5G\n设备：Android' });
  },

  initTrendData: function() {
    var raw = [
      { label: '周一', value: 12 },
      { label: '周二', value: 18 },
      { label: '周三', value: 15 },
      { label: '周四', value: 22 },
      { label: '周五', value: 28 },
      { label: '周六', value: 24 },
      { label: '周日', value: 30 }
    ];

    var list = [];
    var maxVal = 30;
    var minDot = 100;

    for (var i = 0; i < raw.length; i++) {
      var pct = Math.round(raw[i].value * 100 / maxVal);
      list.push({ label: raw[i].label, dotBottom: pct });
      if (pct < minDot) minDot = pct;
    }

    var areaH = Math.round((100 - minDot) * 0.6) + minDot;

    this.setData({
      trendData: list,
      lineAreaHeight: areaH
    });
  },

  toggleTrend: function() {
    this.setData({ trendExpanded: !this.data.trendExpanded });
  },

  toggleTargeting: function() {
    this.setData({ targetingExpanded: !this.data.targetingExpanded });
  },

  goBack: function() {
    wx.navigateBack({ delta: 1 });
  },

  openEditModal: function(e) {
    var field = e.currentTarget.dataset.field;
    var label = e.currentTarget.dataset.label;
    var currentVal = e.currentTarget.dataset.value;
    var type = 'value';
    if (field.indexOf('budget') !== -1) type = 'budget';
    if (field.indexOf('bid') !== -1 || field.indexOf('Price') !== -1) type = 'bid';

    this.setData({
      showEditModal: true,
      editType: type,
      editField: field,
      editLabel: label,
      editValue: String(currentVal)
    });
  },

  closeEditModal: function() {
    this.setData({ showEditModal: false, editType: '', editField: '', editValue: '' });
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

    // 更新infoFields
    var fields = this.data.infoFields;
    var field = this.data.editField;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].key === field) {
        fields[i].value = val;
        break;
      }
    }

    this.setData({ infoFields: fields, showEditModal: false });
    wx.showToast({ title: '保存成功', icon: 'success' });
  }
});