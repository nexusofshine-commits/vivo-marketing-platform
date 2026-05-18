<template>
  <div class="home-container" style="padding-bottom: 80px;">
    <div class="header">
      <div class="user-info" @click="goToProfile">
        <div class="avatar">
          <span class="avatar-icon">👤</span>
        </div>
        <div class="user-text">
          <span class="user-name">{{ user?.name || '用户' }}</span>
          <span class="user-uuid">{{ user?.uuid || '' }}</span>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon blue">💰</div>
          <div class="card-content">
            <span class="card-value">¥{{ totalSpend.toFixed(2) }}</span>
            <span class="card-label">今日花费</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon green">👁️</div>
          <div class="card-content">
            <span class="card-value">{{ totalImpressions.toLocaleString() }}</span>
            <span class="card-label">总曝光</span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">
          <span class="section-title">账户概览</span>
          <span class="section-link" @click="goToAccounts">查看全部</span>
        </div>
        <div class="account-list">
          <div
            v-for="account in activeAccounts"
            :key="account.id"
            class="account-card"
            @click="showAccountDetail(account)"
          >
            <div class="account-header">
              <span class="account-name">{{ account.name }}</span>
              <div class="status-tag" :class="account.status">
                {{ getStatusText(account.status) }}
              </div>
            </div>
            <div class="account-stats">
              <div class="stat-item">
                <span class="stat-value">¥{{ account.spendToday.toFixed(2) }}</span>
                <span class="stat-label">今日花费</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ account.ctr }}%</span>
                <span class="stat-label">点击率</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ account.clicks }}</span>
                <span class="stat-label">点击量</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">
          <span class="section-title">投放计划</span>
        </div>
        <div class="campaign-list">
          <div
            v-for="campaign in runningCampaigns"
            :key="campaign.id"
            class="campaign-card"
          >
            <div class="campaign-info">
              <span class="campaign-name">{{ campaign.name }}</span>
              <div class="campaign-status" :class="campaign.status">
                {{ getCampaignStatus(campaign.status) }}
              </div>
            </div>
            <div class="campaign-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: (campaign.spent / campaign.budget * 100) + '%' }"
                ></div>
              </div>
              <span class="progress-text">¥{{ campaign.spent.toFixed(2) }} / ¥{{ campaign.budget }}</span>
            </div>
            <div class="campaign-metrics">
              <span class="metric">{{ campaign.impressions.toLocaleString() }} 曝光</span>
              <span class="metric">{{ campaign.clicks }} 点击</span>
              <span class="metric">{{ campaign.conversions }} 转化</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quick-actions">
        <div class="action-item" @click="goToDiagnosis">
          <div class="action-icon diagnosis">🔍</div>
          <span class="action-text">智能诊断</span>
        </div>
        <div class="action-item" @click="goToBind">
          <div class="action-icon bind">➕</div>
          <span class="action-text">绑定账户</span>
        </div>
      </div>
    </div>
    
    <TabBar current="/multi/home" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { AdAccount, AdCampaign } from '@/types'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()
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
  router.push('/multi/profile')
}

const goToAccounts = () => {
  router.push('/multi/accounts')
}

const goToDiagnosis = () => {
  router.push('/multi/diagnosis')
}

const goToBind = () => {
  router.push('/bind')
}

const showAccountDetail = (account: AdAccount) => {
  alert(`查看 ${account.name}\n平台：${account.platform}\n状态：${getStatusText(account.status)}\n余额：¥${account.balance.toFixed(2)}`)
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  padding: 20px 24px;
  padding-top: calc(20px + env(safe-area-inset-top));
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.avatar-icon {
  font-size: 24px;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}

.user-uuid {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

.summary-cards {
  display: flex;
  gap: 12px;
  margin-top: -20px;
}

.summary-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  
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
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.section {
  margin-top: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.section-link {
  font-size: 14px;
  color: #4080ff;
  cursor: pointer;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.account-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
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
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.campaign-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.campaign-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.campaign-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.campaign-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.campaign-status {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 8px;
  
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
  margin-bottom: 12px;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4080ff 0%, #6b9dff 100%);
  border-radius: 3px;
}

.progress-text {
  font-size: 12px;
  color: #999;
}

.campaign-metrics {
  display: flex;
  gap: 16px;
}

.metric {
  font-size: 12px;
  color: #666;
}

.quick-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.action-item {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 8px;
  
  &.diagnosis {
    background: #fff7e6;
  }
  
  &.bind {
    background: #e6f7ff;
  }
}

.action-text {
  font-size: 14px;
  color: #333;
}
</style>
