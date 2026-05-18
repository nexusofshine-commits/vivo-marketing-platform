<template>
  <view class="accounts-container">
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input 
          class="search-input" 
          placeholder="搜索账户" 
          v-model="searchText"
        />
      </view>
    </view>
    
    <view class="filter-tabs">
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        全部
      </view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'active' }"
        @click="activeFilter = 'active'"
      >
        投放中
      </view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'inactive' }"
        @click="activeFilter = 'inactive'"
      >
        已暂停
      </view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'pending' }"
        @click="activeFilter = 'pending'"
      >
        审核中
      </view>
    </view>
    
    <view class="accounts-list">
      <view 
        v-for="account in filteredAccounts" 
        :key="account.id" 
        class="account-card"
        @click="showAccountDetail(account)"
      >
        <view class="account-left">
          <view class="platform-icon" :class="account.platform">
            {{ getPlatformIcon(account.platform) }}
          </view>
          <view class="account-info">
            <text class="account-name">{{ account.name }}</text>
            <text class="platform-name">{{ account.platform }}</text>
          </view>
        </view>
        <view class="account-right">
          <view class="status-tag" :class="account.status">
            {{ getStatusText(account.status) }}
          </view>
        </view>
      </view>
    </view>
    
    <view class="empty-state" v-if="filteredAccounts.length === 0">
      <text class="empty-icon">📭</text>
      <text class="empty-text">暂无账户</text>
      <view class="btn-secondary mt-20" @click="goToBind">
        立即绑定
      </view>
    </view>
    
    <view class="bottom-action">
      <view class="btn-primary" @click="goToBind">
        + 绑定新账户
      </view>
    </view>
    
    <TabBar current="/pages/multi-account/accounts/index" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type { AdAccount } from '@/types'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const accounts = computed(() => userStore.accounts)
const searchText = ref('')
const activeFilter = ref('all')

const filteredAccounts = computed(() => {
  let result = accounts.value
  
  if (activeFilter.value !== 'all') {
    result = result.filter(a => a.status === activeFilter.value)
  }
  
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(a => 
      a.name.toLowerCase().includes(keyword) || 
      a.platform.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    active: '投放中',
    inactive: '已暂停',
    pending: '审核中'
  }
  return map[status] || status
}

const getPlatformIcon = (platform: string) => {
  const map: Record<string, string> = {
    '微信': '💬',
    '抖音': '🎵',
    '小红书': '📕',
    '微博': '🔴',
    '淘宝': '🛒',
    '京东': '🔷'
  }
  return map[platform] || '📦'
}

const goToBind = () => {
  uni.navigateTo({ url: '/pages/bind/index' })
}

const showAccountDetail = (account: AdAccount) => {
  uni.showModal({
    title: account.name,
    content: `平台：${account.platform}\n状态：${getStatusText(account.status)}\n余额：¥${account.balance.toFixed(2)}`,
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.accounts-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 24rpx;
  padding-bottom: 140rpx;
}

.search-bar {
  margin-bottom: 20rpx;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 40rpx;
  padding: 0 24rpx;
  height: 80rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
}

.filter-tabs {
  display: flex;
  background: #fff;
  border-radius: 12rpx;
  padding: 8rpx;
  margin-bottom: 20rpx;
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 16rpx;
  font-size: 28rpx;
  color: #666;
  border-radius: 8rpx;
  transition: all 0.3s;
  
  &.active {
    background: #4080ff;
    color: #fff;
  }
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.account-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
}

.account-left {
  display: flex;
  align-items: center;
}

.platform-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  margin-right: 20rpx;
  
  &.微信 {
    background: #e8f5e9;
  }
  
  &.抖音 {
    background: #fff3e0;
  }
  
  &.小红书 {
    background: #fce4ec;
  }
  
  &.微博 {
    background: #ffebee;
  }
  
  &.淘宝 {
    background: #fff3e0;
  }
  
  &.京东 {
    background: #e3f2fd;
  }
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.platform-name {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
}

.account-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
}
</style>