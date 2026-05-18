<template>
  <view class="bind-container">
    <view class="bind-header">
      <text class="bind-title">账号绑定</text>
      <text class="bind-desc">扫描下方二维码，绑定您的广告账户</text>
    </view>
    
    <view class="qrcode-section">
      <view class="qrcode-card">
        <view class="qrcode-placeholder">
          <text class="qrcode-icon">📱</text>
          <text class="qrcode-text">扫码绑定</text>
        </view>
        <text class="qrcode-hint">请使用广告平台APP扫码</text>
      </view>
    </view>
    
    <view class="platform-section">
      <text class="section-title">选择平台</text>
      <view class="platform-grid">
        <view 
          v-for="platform in platforms" 
          :key="platform.name"
          class="platform-item"
          :class="{ selected: selectedPlatform === platform.name }"
          @click="selectedPlatform = platform.name"
        >
          <view class="platform-icon">{{ platform.icon }}</view>
          <text class="platform-name">{{ platform.name }}</text>
        </view>
      </view>
    </view>
    
    <view class="form-section">
      <view class="form-item">
        <text class="form-label">账户名称</text>
        <input 
          class="form-input" 
          placeholder="请输入账户名称" 
          v-model="accountName"
        />
      </view>
      <view class="form-item">
        <text class="form-label">账户ID</text>
        <input 
          class="form-input" 
          placeholder="请输入账户ID" 
          v-model="accountId"
        />
      </view>
    </view>
    
    <view class="agreement-section">
      <view class="checkbox" :class="{ checked: agreed }" @click="agreed = !agreed">
        <text v-if="agreed">✓</text>
      </view>
      <text class="agreement-text">
        我已阅读并同意
        <text class="agreement-link">《服务协议》</text>
        和
        <text class="agreement-link">《隐私政策》</text>
      </text>
    </view>
    
    <view class="btn-primary bind-btn" @click="handleBind">
      确认绑定
    </view>
    
    <view class="tips-section">
      <view class="tip-item">
        <text class="tip-icon">💡</text>
        <text class="tip-text">绑定后您可以在小程序中管理该账户的广告投放</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">🔒</text>
        <text class="tip-text">您的账户信息将被安全加密存储</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedPlatform = ref('微信')
const accountName = ref('')
const accountId = ref('')
const agreed = ref(false)

const platforms = [
  { name: '微信', icon: '💬' },
  { name: '抖音', icon: '🎵' },
  { name: '小红书', icon: '📕' },
  { name: '微博', icon: '🔴' },
  { name: '淘宝', icon: '🛒' },
  { name: '京东', icon: '🔷' }
]

const handleBind = () => {
  if (!selectedPlatform.value) {
    uni.showToast({ title: '请选择平台', icon: 'none' })
    return
  }
  if (!accountName.value) {
    uni.showToast({ title: '请输入账户名称', icon: 'none' })
    return
  }
  if (!accountId.value) {
    uni.showToast({ title: '请输入账户ID', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请同意服务协议', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '绑定中...' })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '绑定成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.bind-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;
}

.bind-header {
  text-align: center;
  padding: 40rpx 0;
}

.bind-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 16rpx;
}

.bind-desc {
  font-size: 28rpx;
  color: #666;
}

.qrcode-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.qrcode-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  text-align: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.qrcode-placeholder {
  width: 240rpx;
  height: 240rpx;
  background: #f5f5f5;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20rpx;
}

.qrcode-icon {
  font-size: 80rpx;
  margin-bottom: 16rpx;
}

.qrcode-text {
  font-size: 28rpx;
  color: #666;
}

.qrcode-hint {
  font-size: 24rpx;
  color: #999;
}

.platform-section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.platform-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.platform-item {
  width: calc(33.33% - 12rpx);
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid transparent;
  
  &.selected {
    border-color: #4080ff;
    background: #e8f0ff;
  }
}

.platform-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.platform-name {
  font-size: 26rpx;
  color: #333;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 24rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  display: block;
}

.form-input {
  width: 100%;
  height: 80rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.agreement-section {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ccc;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
  font-size: 24rpx;
  color: #fff;
  
  &.checked {
    background: #4080ff;
    border-color: #4080ff;
  }
}

.agreement-text {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

.agreement-link {
  color: #4080ff;
}

.bind-btn {
  margin-bottom: 30rpx;
}

.tips-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.tip-icon {
  font-size: 32rpx;
  margin-right: 12rpx;
}

.tip-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}
</style>