<template>
  <view class="single-profile-container">
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
          <text>单账户版</text>
        </view>
      </view>
    </view>
    
    <view class="current-account-card">
      <view class="account-header">
        <text class="account-title">当前账户</text>
        <text class="account-status" :class="currentAccount?.status">
          {{ getStatusText(currentAccount?.status) }}
        </text>
      </view>
      <text class="account-name">{{ currentAccount?.name || '未绑定账户' }}</text>
      <view class="account-metrics">
        <view class="account-metric">
          <text class="metric-value">¥{{ currentAccount?.balance.toFixed(2) || '0.00' }}</text>
          <text class="metric-label">账户余额</text>
        </view>
        <view class="account-metric">
          <text class="metric-value">{{ currentAccount?.ctr }}%</text>
          <text class="metric-label">点击率</text>
        </view>
      </view>
    </view>
    
    <view class="menu-section">
      <view class="menu-list">
        <view class="menu-item" @click="handleMenuClick('bind')">
          <view class="menu-icon bind">🔗</view>
          <text class="menu-text">账号绑定</text>
          <text class="menu-arrow">›</text>
        </view>
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
    
    <view class="nav-bar">
      <view class="nav-item" @click="goToHome">
        <text class="nav-icon">📊</text>
        <text class="nav-text">投放</text>
      </view>
      <view class="nav-item" @click="goToStats">
        <text class="nav-icon">📈</text>
        <text class="nav-text">数据</text>
      </view>
      <view class="nav-item active">
        <text class="nav-icon">👤</text>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const accounts = computed(() => userStore.accounts)
const currentAccount = computed(() => accounts.value[0])

const getStatusText = (status?: string) => {
  if (!status) return '未知'
  const map: Record<string, string> = {
    active: '投放中',
    inactive: '已暂停',
    pending: '审核中'
  }
  return map[status] || status
}

const handleMenuClick = (type: string) => {
  switch (type) {
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

const goToHome = () => {
  uni.navigateBack()
}

const goToStats = () => {
  uni.navigateBack()
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
.single-profile-container {
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

.current-account-card {
  background: #fff;
  margin: -20rpx 24rpx 24rpx;
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.account-title {
  font-size: 26rpx;
  color: #999;
}

.account-status {
  font-size: 22rpx;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  
  &.active {
    background: #f6ffed;
    color: #52c41a;
  }
  
  &.inactive {
    background: #fff2e8;
    color: #fa8c16;
  }
  
  &.pending {
    background: #e6f7ff;
    color: #1890ff;
  }
}

.account-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.account-metrics {
  display: flex;
  gap: 32rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;
}

.account-metric {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.menu-section {
  margin: 0 24rpx;
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
  padding: 24rpx;
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

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.active {
    .nav-text {
      color: #4080ff;
    }
  }
}

.nav-icon {
  font-size: 36rpx;
  margin-bottom: 8rpx;
}

.nav-text {
  font-size: 22rpx;
  color: #999;
}
</style>