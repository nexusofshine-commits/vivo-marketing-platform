var app = getApp();

Component({
  data: {
    selected: 0,
    color: '#999999',
    selectedColor: '#0066FF',
    list: [
      {
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/assets/icons/home.png',
        selectedIconPath: '/assets/icons/home-active.png'
      },
      {
        pagePath: '/pages/account-manage/account-manage',
        text: '投放账号管理',
        iconPath: '/assets/icons/account.png',
        selectedIconPath: '/assets/icons/account-active.png'
      },
      {
        pagePath: '/pages/diagnosis/diagnosis',
        text: '智能诊断',
        iconPath: '/assets/icons/diagnosis.png',
        selectedIconPath: '/assets/icons/diagnosis-active.png'
      }
    ],
    secondTabText: '投放账号管理'
  },

  attached: function() {
    this.updateTabText();
  },

  methods: {
    updateTabText: function() {
      var type = app.globalData.accountType || '投放账号';
      var text = type === '投放账号' ? '推广管理' : '投放账号管理';
      this.setData({ secondTabText: text });
    },

    switchTab: function(e) {
      var data = e.currentTarget.dataset;
      var url = data.path;
      
      if (url === this.data.list[this.data.selected].pagePath) {
        return;
      }

      this.setData({ selected: data.index });
      wx.switchTab({ url: url });
    },

    updateSelected: function(index) {
      this.setData({ selected: index });
      this.updateTabText();
    }
  }
})