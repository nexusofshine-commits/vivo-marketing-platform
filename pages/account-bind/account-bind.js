var app = getApp();

Page({
  data: {
    selectedRole: '',
    username: '',
    password: ''
  },

  selectRole: function(e) {
    var role = e.currentTarget.dataset.role;
    this.setData({ selectedRole: role });
  },

  onUsernameInput: function(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput: function(e) {
    this.setData({ password: e.detail.value });
  },

  submitBind: function() {
    var role = this.data.selectedRole;
    var username = this.data.username;
    var password = this.data.password;

    if (!role) {
      wx.showToast({ title: '请选择角色类型', icon: 'none' });
      return;
    }

    if (!username) {
      wx.showToast({ title: '请输入账号', icon: 'none' });
      return;
    }

    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '登录中...' });

    setTimeout(function() {
      wx.hideLoading();
      
      var roleNames = {
        business: '经营主体',
        unit: '业务单元',
        account: '投放账号'
      };

      wx.showToast({ 
        title: '绑定成功', 
        icon: 'success',
        duration: 1500 
      });

      setTimeout(function() {
        wx.navigateBack();
      }, 1200);
    }, 1500);
  }
})