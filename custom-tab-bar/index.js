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
    ]
  },

  attached: function() {
  },

  methods: {
    switchTab: function(e) {
      var data = e.currentTarget.dataset;
      var url = data.path;
      
      this.setData({ selected: data.index });
      wx.switchTab({ url: url });
    },

    updateSelected: function(index) {
      this.setData({ selected: index });
    }
  }
})