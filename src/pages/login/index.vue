<template>
  <view class="login-container">
    <view class="logo-section">
      <view class="logo">
        <text class="logo-icon">📊</text>
      </view>
      <text class="app-title">广告投放管理</text>
      <text class="app-subtitle">一站式多平台广告管理解决方案</text>
    </view>
    
    <view class="login-form">
      <view class="form-item">
        <text class="form-label">账号类型</text>
        <view class="radio-group">
          <view 
            class="radio-item" 
            :class="{ active: accountType === 'multi' }"
            @click="accountType = 'multi'"
          >
            <view class="radio-dot"></view>
            <text>多账户版</text>
          </view>
          <view 
            class="radio-item" 
            :class="{ active: accountType === 'single' }"
            @click="accountType = 'single'"
          >
            <view class="radio-dot"></view>
            <text>单账户版</text>
          </view>
        </view>
      </view>
      
      <view class="qrcode-section">
        <view class="qrcode-placeholder">
          <text class="qrcode-icon">📱</text>
          <text class="qrcode-text">扫码登录</text>
        </view>
        <text class="qrcode-hint">请使用企业微信/微信扫码登录</text>
      </view>
      
      <view class="btn-primary login-btn" @click="handleLogin">
        登录
      </view>
      
      <view class="link-row">
        <text class="link-text" @click="goToBind">账号绑定</text>
      </view>
    </view>
    
    <view class="footer">
      <text class="footer-text">© 2024 广告投放管理系统</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { mockUserMulti, mockUserSingle, mockAccounts, mockCampaigns, mockDiagnosisResults } from '@/data/mock'

const accountType = ref<'multi' | 'single'>('multi')
const userStore = useUserStore()

const handleLogin = () => {
  if (accountType.value === 'multi') {
    userStore.setUser(mockUserMulti)
    userStore.setAccounts(mockAccounts)
    userStore.setCampaigns(mockCampaigns)
    userStore.setDiagnosisResults(mockDiagnosisResults)
    uni.switchTab({ url: '/pages/multi-account/home/index' })
  } else {
    userStore.setUser(mockUserSingle)
    userStore.setAccounts(mockAccounts.slice(0, 1))
    userStore.setCampaigns(mockCampaigns.slice(0, 2))
    uni.navigateTo({ url: '/pages/single-account/home/index' })
  }
}

const goToBind = () => {
  uni.navigateTo({ url: '/pages/bind/index' })
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #4080ff 0%, #6b9dff 100%);
  padding: 40rpx;
  box-sizing: border-box;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120rpx;
  padding-bottom: 80rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.logo-icon {
  font-size: 80rpx;
}

.app-title {
  font-size: 48rpx;
  color: #fff;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.app-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.15);
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.radio-group {
  display: flex;
  gap: 30rpx;
}

.radio-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx;
  background: #f5f5f5;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
  
  &.active {
    background: #e8f0ff;
    border-color: #4080ff;
  }
}

.radio-dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  border: 2rpx solid #999;
  margin-right: 12rpx;
  
  .active & {
    background: #4080ff;
    border-color: #4080ff;
  }
}

.qrcode-section {
  text-align: center;
  padding: 40rpx 0;
  border-top: 1rpx solid #f0f0f0;
  border-bottom: 1rpx solid #f0f0f0;
  margin: 30rpx 0;
}

.qrcode-placeholder {
  width: 200rpx;
  height: 200rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20rpx;
}

.qrcode-icon {
  font-size: 60rpx;
  margin-bottom: 10rpx;
}

.qrcode-text {
  font-size: 26rpx;
  color: #666;
}

.qrcode-hint {
  font-size: 24rpx;
  color: #999;
}

.login-btn {
  margin-top: 20rpx;
  font-size: 32rpx;
}

.link-row {
  text-align: center;
  margin-top: 30rpx;
}

.link-text {
  font-size: 26rpx;
  color: #4080ff;
}

.footer {
  text-align: center;
  padding-top: 60rpx;
}

.footer-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
}
</style>