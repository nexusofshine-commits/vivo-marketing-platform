<template>
  <view class="profile-container">
    <view class="profile-header">
      <view class="user-card">
        <view class="avatar">
          <text class="avatar-icon">👤</text>
        </view>
        <view class="user-info">
          <text class="user-name">{{ user?.name || '用户' }}</text>
          <text class="user-uuid">UUID: {{ user?.uuid || '' }}</text>
        </view>
        <view class="account-type">
          <text>{{ user?.accountType === 'multi' ? '多账户版' : '单账户版' }}</text>
        </view>
      </view>
    </view>
    
    <view class="menu-section">
      <view class="menu-list">
        <view class="menu-item" @click="handleMenuClick('accounts')">
          <view class="menu-icon accounts">📊</view>
          <text class="menu-text">账户管理</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleMenuClick('statistics')">
          <view class="menu-icon stats">📈</view>
          <text class="menu-text">数据统计</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleMenuClick('diagnosis')">
          <view class="menu-icon diagnosis">🔍</view>
          <text class="menu-text">智能诊断</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleMenuClick('bind')">
          <view class="menu-icon bind">🔗</view>
          <text class="menu-text">账号绑定</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>
    
    <view class="menu-section">
      <view class="menu-list">
        <view class="menu-item" @click="handleMenuClick('settings')">
          <view class="menu-icon settings">⚙️</view>
          <text class="menu-text">设置</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleMenuClick('help')">
          <view class="menu-icon help">❓</view>
          <text class="menu-text">帮助与反馈</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleMenuClick('about')">
          <view class="menu-icon about">ℹ️</view>
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>
    
    <view class="action-section">
      <view class="action-item" @click="switchAccount">
        <text class="action-text">切换登录账户</text>
      </view>
      <view class="action-item logout" @click="handleLogout">
        <text class="action-text">退出登录</text>
      </view>
    </view>
    
    <TabBar current="/pages/multi-account/profile/index" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const handleMenuClick = (type: string) => {
  switch (type) {
    case 'accounts':
      uni.switchTab({ url: '/pages/multi-account/accounts/index' })
      break
    case 'diagnosis':
      uni.switchTab({ url: '/pages/multi-account/diagnosis/index' })
      break
    case 'bind':
      uni.navigateTo({ url: '/pages/bind/index' })
      break
    case 'settings':
    case 'help':
    case 'about':
      uni.showToast({
        title: `即将打开${type === 'settings' ? '设置' : type === 'help' ? '帮助与反馈' : '关于我们'}`,
        icon: 'none'
      })
      break
  }
}

const switchAccount = () => {
  uni.showToast({
    title: '切换账户',
    icon: 'none'
  })
}

const handleLogout = () => {
  uni.showModal({
    title: '退出登录',
    content: '确定要退出当前账户吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.redirectTo({ url: '/pages/login/index' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.profile-header {
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  padding: 40rpx 30rpx;
  padding-top: calc(60rpx + env(safe-area-inset-top));
}

.user-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16rpx;
  padding: 24rpx;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.avatar-icon {
  font-size: 48rpx;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #fff;
}

.user-uuid {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8rpx;
}

.account-type {
  background: rgba(255, 255, 255, 0.2);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  color: #fff;
}

.menu-section {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.menu-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  margin-right: 20rpx;
  
  &.accounts {
    background: #e8f5e9;
  }
  
  &.stats {
    background: #e3f2fd;
  }
  
  &.diagnosis {
    background: #fff3e0;
  }
  
  &.bind {
    background: #fce4ec;
  }
  
  &.settings {
    background: #e8eaf6;
  }
  
  &.help {
    background: #e0f7fa;
  }
  
  &.about {
    background: #f3e5f5;
  }
}

.menu-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.menu-arrow {
  font-size: 32rpx;
  color: #ccc;
}

.action-section {
  padding: 0 20rpx;
}

.action-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 28rpx;
  text-align: center;
  margin-bottom: 16rpx;
  
  &.logout {
    background: #fff5f5;
    
    .action-text {
      color: #ff4d4f;
    }
  }
}

.action-text {
  font-size: 30rpx;
  color: #333;
}
</style>