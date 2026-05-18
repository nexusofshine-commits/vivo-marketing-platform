<template>
  <view class="single-home-container">
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
    
    <view class="current-account">
      <view class="account-info">
        <text class="account-label">当前账户</text>
        <text class="account-name">{{ currentAccount?.name || '未绑定账户' }}</text>
      </view>
      <view class="status-tag" :class="currentAccount?.status">
        {{ getStatusText(currentAccount?.status) }}
      </view>
    </view>
    
    <view class="summary-cards">
      <view class="summary-card">
        <view class="card-icon blue">💰</view>
        <view class="card-content">
          <text class="card-value">¥{{ currentAccount?.spendToday.toFixed(2) || '0.00' }}</text>
          <text class="card-label">今日花费</text>
        </view>
      </view>
      <view class="summary-card">
        <view class="card-icon green">👁️</view>
        <view class="card-content">
          <text class="card-value">{{ currentAccount?.impressions.toLocaleString() || '0' }}</text>
          <text class="card-label">曝光量</text>
        </view>
      </view>
      <view class="summary-card">
        <view class="card-icon orange">👆</view>
        <view class="card-content">
          <text class="card-value">{{ currentAccount?.clicks || '0' }}</text>
          <text class="card-label">点击量</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">投放计划</text>
        <view class="add-btn" @click="createCampaign">
          <text>+ 新建</text>
        </view>
      </view>
      
      <view class="campaign-list">
        <view 
          v-for="campaign in campaigns" 
          :key="campaign.id" 
          class="campaign-card"
        >
          <view class="campaign-header">
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
            <view class="metric-item">
              <text class="metric-value">{{ campaign.ctr }}%</text>
              <text class="metric-label">CTR</text>
            </view>
            <view class="metric-item">
              <text class="metric-value">¥{{ campaign.cpc.toFixed(2) }}</text>
              <text class="metric-label">CPC</text>
            </view>
            <view class="metric-item">
              <text class="metric-value">¥{{ campaign.cpa.toFixed(2) }}</text>
              <text class="metric-label">CPA</text>
            </view>
            <view class="metric-item">
              <text class="metric-value">{{ campaign.conversions }}</text>
              <text class="metric-label">转化</text>
            </view>
          </view>
          
          <view class="campaign-actions">
            <view 
              class="action-btn" 
              :class="{ active: campaign.status === 'running' }"
              @click="toggleCampaign(campaign)"
            >
              {{ campaign.status === 'running' ? '暂停' : '启动' }}
            </view>
            <view class="action-btn secondary" @click="editCampaign(campaign)">
              编辑
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="nav-bar">
      <view class="nav-item active">
        <text class="nav-icon">📊</text>
        <text class="nav-text">投放</text>
      </view>
      <view class="nav-item" @click="goToStats">
        <text class="nav-icon">📈</text>
        <text class="nav-text">数据</text>
      </view>
      <view class="nav-item" @click="goToProfile">
        <text class="nav-icon">👤</text>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type { AdCampaign } from '@/types'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const accounts = computed(() => userStore.accounts)
const campaigns = computed(() => userStore.campaigns)

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

const getCampaignStatus = (status: string) => {
  const map: Record<string, string> = {
    running: '投放中',
    paused: '已暂停',
    ended: '已结束'
  }
  return map[status] || status
}

const goToProfile = () => {
  uni.navigateTo({ url: '/pages/single-account/profile/index' })
}

const goToStats = () => {
  uni.navigateTo({ url: '/pages/single-account/stats/index' })
}

const createCampaign = () => {
  uni.showToast({
    title: '新建投放计划',
    icon: 'none'
  })
}

const toggleCampaign = (campaign: AdCampaign) => {
  const newStatus = campaign.status === 'running' ? '已暂停' : '投放中'
  uni.showToast({
    title: `${campaign.name}已${newStatus}`,
    icon: 'none'
  })
}

const editCampaign = (campaign: AdCampaign) => {
  uni.showToast({
    title: `编辑${campaign.name}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.single-home-container {
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

.current-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: -20rpx 24rpx 20rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 4rpx;
}

.account-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.status-tag {
  font-size: 22rpx;
  padding: 8rpx 16rpx;
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

.summary-cards {
  display: flex;
  padding: 0 24rpx;
  gap: 16rpx;
}

.summary-card {
  flex: 1;
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  margin-bottom: 12rpx;
  
  &.blue {
    background: #e8f0ff;
  }
  
  &.green {
    background: #e6f7ff;
  }
  
  &.orange {
    background: #fff7e6;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.section {
  padding: 24rpx;
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

.add-btn {
  background: #4080ff;
  color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 26rpx;
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

.campaign-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.campaign-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.campaign-status {
  font-size: 22rpx;
  padding: 6rpx 12rpx;
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
  justify-content: space-between;
  padding: 16rpx 0;
  border-top: 1rpx solid #f0f0f0;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 16rpx;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-value {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 20rpx;
  color: #999;
  margin-top: 4rpx;
}

.campaign-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  flex: 1;
  text-align: center;
  padding: 16rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
  background: #4080ff;
  color: #fff;
  
  &.secondary {
    background: #f0f0f0;
    color: #666;
  }
  
  &.active {
    background: #faad14;
  }
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