<template>
  <view class="home-container">
    <view class="header">
      <view class="user-info" @click="goToProfile">
        <view class="avatar">
          <text class="avatar-icon">👤</text>
        </view>
        <view class="user-text">
          <text class="user-name">{{ user?.name || '用户' }}</text>
          <text class="user-uuid">{{ user?.uuid || '' }}</text>
        </view>
      </view>
    </view>
    
    <view class="summary-cards">
      <view class="summary-card">
        <view class="card-icon blue">💰</view>
        <view class="card-content">
          <text class="card-value">¥{{ totalSpend.toFixed(2) }}</text>
          <text class="card-label">今日花费</text>
        </view>
      </view>
      <view class="summary-card">
        <view class="card-icon green">👁️</view>
        <view class="card-content">
          <text class="card-value">{{ totalImpressions.toLocaleString() }}</text>
          <text class="card-label">总曝光</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">账户概览</text>
        <text class="section-link" @click="goToAccounts">查看全部</text>
      </view>
      <view class="account-list">
        <view 
          v-for="account in activeAccounts" 
          :key="account.id" 
          class="account-card"
          @click="showAccountDetail(account)"
        >
          <view class="account-header">
            <text class="account-name">{{ account.name }}</text>
            <view class="status-tag" :class="account.status">
              {{ getStatusText(account.status) }}
            </view>
          </view>
          <view class="account-stats">
            <view class="stat-item">
              <text class="stat-value">¥{{ account.spendToday.toFixed(2) }}</text>
              <text class="stat-label">今日花费</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">{{ account.ctr }}%</text>
              <text class="stat-label">点击率</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">{{ account.clicks }}</text>
              <text class="stat-label">点击量</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">投放计划</text>
      </view>
      <view class="campaign-list">
        <view 
          v-for="campaign in runningCampaigns" 
          :key="campaign.id" 
          class="campaign-card"
        >
          <view class="campaign-info">
            <text class="campaign-name">{{ campaign.name }}</text>
            <view class="campaign-status" :class="campaign.status">
              {{ getCampaignStatus(campaign.status) }}
            </view>
          </view>
          <view class="campaign-progress">
            <view class="progress-bar">
              <view 
                class="progress-fill" 
                :style="{ width: (campaign.spent / campaign.budget * 100) + '%' }"
              ></view>
            </view>
            <text class="progress-text">¥{{ campaign.spent.toFixed(2) }} / ¥{{ campaign.budget }}</text>
          </view>
          <view class="campaign-metrics">
            <text class="metric">{{ campaign.impressions.toLocaleString() }} 曝光</text>
            <text class="metric">{{ campaign.clicks }} 点击</text>
            <text class="metric">{{ campaign.conversions }} 转化</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="quick-actions">
      <view class="action-item" @click="goToDiagnosis">
        <view class="action-icon diagnosis">🔍</view>
        <text class="action-text">智能诊断</text>
      </view>
      <view class="action-item" @click="goToBind">
        <view class="action-icon bind">➕</view>
        <text class="action-text">绑定账户</text>
      </view>
    </view>
    
    <TabBar current="/pages/multi-account/home/index" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type { AdAccount, AdCampaign } from '@/types'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const accounts = computed(() => userStore.accounts)
const campaigns = computed(() => userStore.campaigns)

const activeAccounts = computed(() => accounts.value.filter(a => a.status === 'active').slice(0, 3))
const runningCampaigns = computed(() => campaigns.value.filter(c => c.status === 'running'))

const totalSpend = computed(() => {
  return accounts.value.reduce((sum, acc) => sum + acc.spendToday, 0)
})

const totalImpressions = computed(() => {
  return accounts.value.reduce((sum, acc) => sum + acc.impressions, 0)
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    active: '投放中',
    inactive: '已暂停',
    pending: '审核中'
  }
  return map[status] || status
}

const getCampaignStatus = (status: string) => {
  const map: Record<string, string> = {
    running: '投放中',
    paused: '已暂停',
    ended: '已结束'
  }
  return map[status] || status
}

const goToProfile = () => {
  uni.switchTab({ url: '/pages/multi-account/profile/index' })
}

const goToAccounts = () => {
  uni.switchTab({ url: '/pages/multi-account/accounts/index' })
}

const goToDiagnosis = () => {
  uni.switchTab({ url: '/pages/multi-account/diagnosis/index' })
}

const goToBind = () => {
  uni.navigateTo({ url: '/pages/bind/index' })
}

const showAccountDetail = (account: AdAccount) => {
  uni.showToast({
    title: `查看 ${account.name}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.header {
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  padding: 40rpx 30rpx;
  padding-top: calc(40rpx + env(safe-area-inset-top));
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.avatar-icon {
  font-size: 40rpx;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 32rpx;
  color: #fff;
  font-weight: bold;
}

.user-uuid {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4rpx;
}

.summary-cards {
  display: flex;
  gap: 20rpx;
  padding: 0 30rpx;
  margin-top: -40rpx;
}

.summary-card {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 16rpx;
  
  &.blue {
    background: #e8f0ff;
  }
  
  &.green {
    background: #e6f7ff;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.section {
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.section-link {
  font-size: 26rpx;
  color: #4080ff;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.account-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.account-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.status-tag {
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  
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

.account-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.campaign-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.campaign-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
}

.campaign-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.campaign-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.campaign-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  
  &.running {
    background: #f6ffed;
    color: #52c41a;
  }
  
  &.paused {
    background: #fff2e8;
    color: #fa8c16;
  }
  
  &.ended {
    background: #f5f5f5;
    color: #999;
  }
}

.campaign-progress {
  margin-bottom: 16rpx;
}

.progress-bar {
  height: 8rpx;
  background: #f0f0f0;
  border-radius: 4rpx;
  overflow: hidden;
  margin-bottom: 8rpx;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4080ff 0%, #6b9dff 100%);
  border-radius: 4rpx;
}

.progress-text {
  font-size: 22rpx;
  color: #999;
}

.campaign-metrics {
  display: flex;
  gap: 24rpx;
}

.metric {
  font-size: 22rpx;
  color: #666;
}

.quick-actions {
  display: flex;
  padding: 0 30rpx;
  gap: 20rpx;
}

.action-item {
  flex: 1;
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.action-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-bottom: 12rpx;
  
  &.diagnosis {
    background: #fff7e6;
  }
  
  &.bind {
    background: #e6f7ff;
  }
}

.action-text {
  font-size: 26rpx;
  color: #333;
}
</style>