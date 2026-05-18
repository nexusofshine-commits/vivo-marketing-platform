<template>
  <div class="accounts-container" style="padding-bottom: 80px;">
    <div class="container">
      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input
            class="search-input"
            placeholder="搜索账户"
            v-model="searchText"
          />
        </div>
      </div>
      
      <div class="filter-tabs">
        <div
          class="filter-tab"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          全部
        </div>
        <div
          class="filter-tab"
          :class="{ active: activeFilter === 'active' }"
          @click="activeFilter = 'active'"
        >
          投放中
        </div>
        <div
          class="filter-tab"
          :class="{ active: activeFilter === 'inactive' }"
          @click="activeFilter = 'inactive'"
        >
          已暂停
        </div>
        <div
          class="filter-tab"
          :class="{ active: activeFilter === 'pending' }"
          @click="activeFilter = 'pending'"
        >
          审核中
        </div>
      </div>
      
      <div class="accounts-list">
        <div
          v-for="account in filteredAccounts"
          :key="account.id"
          class="account-card"
          @click="showAccountDetail(account)"
        >
          <div class="account-left">
            <div class="platform-icon" :class="account.platform">
              {{ getPlatformIcon(account.platform) }}
            </div>
            <div class="account-info">
              <span class="account-name">{{ account.name }}</span>
              <span class="platform-name">{{ account.platform }}</span>
            </div>
          </div>
          <div class="account-right">
            <div class="status-tag" :class="account.status">
              {{ getStatusText(account.status) }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="empty-state" v-if="filteredAccounts.length === 0">
        <span class="empty-icon">📭</span>
        <span class="empty-text">暂无账户</span>
        <button class="btn-secondary mt-10" @click="goToBind">立即绑定</button>
      </div>
      
      <div class="bottom-action">
        <button class="btn-primary" @click="goToBind">+ 绑定新账户</button>
      </div>
    </div>
    
    <TabBar current="/multi/accounts" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { AdAccount } from '@/types'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()
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
  router.push('/bind')
}

const showAccountDetail = (account: AdAccount) => {
  alert(`${account.name}\n平台：${account.platform}\n状态：${getStatusText(account.status)}\n余额：¥${account.balance.toFixed(2)}\n今日花费：¥${account.spendToday.toFixed(2)}\n曝光：${account.impressions}\n点击：${account.clicks}\n点击率：${account.ctr}%`)
}
</script>

<style lang="scss" scoped>
.accounts-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.search-bar {
  margin-bottom: 16px;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 40px;
  padding: 0 20px;
  height: 48px;
}

.search-icon {
  font-size: 20px;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  border: none;
  outline: none;
  background: transparent;
}

.filter-tabs {
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 16px;
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  
  &.active {
    background: #4080ff;
    color: #fff;
  }
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
}

.account-left {
  display: flex;
  align-items: center;
}

.platform-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  
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
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.platform-name {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.account-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.status-tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  
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
  padding: 80px 0;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #999;
}

.bottom-action {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 16px 24px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
  z-index: 10;
}
</style>
