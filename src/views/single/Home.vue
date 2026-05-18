<template>
  <div class="single-home-container" style="padding-bottom: 80px;">
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
      <div class="current-account">
        <div class="account-info">
          <span class="account-label">当前账户</span>
          <span class="account-name">{{ currentAccount?.name || '未绑定账户' }}</span>
        </div>
        <div class="status-tag" :class="currentAccount?.status">
          {{ getStatusText(currentAccount?.status) }}
        </div>
      </div>
      
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon blue">💰</div>
          <div class="card-content">
            <span class="card-value">¥{{ currentAccount?.spendToday.toFixed(2) || '0.00' }}</span>
            <span class="card-label">今日花费</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon green">👁️</div>
          <div class="card-content">
            <span class="card-value">{{ currentAccount?.impressions.toLocaleString() || '0' }}</span>
            <span class="card-label">曝光量</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon orange">👆</div>
          <div class="card-content">
            <span class="card-value">{{ currentAccount?.clicks || '0' }}</span>
            <span class="card-label">点击量</span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">
          <span class="section-title">投放计划</span>
          <div class="add-btn" @click="createCampaign">
            <span>+ 新建</span>
          </div>
        </div>
        
        <div class="campaign-list">
          <div
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="campaign-card"
          >
            <div class="campaign-header">
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
              <div class="metric-item">
                <span class="metric-value">{{ campaign.ctr }}%</span>
                <span class="metric-label">CTR</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">¥{{ campaign.cpc.toFixed(2) }}</span>
                <span class="metric-label">CPC</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">¥{{ campaign.cpa.toFixed(2) }}</span>
                <span class="metric-label">CPA</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">{{ campaign.conversions }}</span>
                <span class="metric-label">转化</span>
              </div>
            </div>
            
            <div class="campaign-actions">
              <button
                class="action-btn"
                :class="{ active: campaign.status === 'running' }"
                @click="toggleCampaign(campaign)"
              >
                {{ campaign.status === 'running' ? '暂停' : '启动' }}
              </button>
              <button class="action-btn secondary" @click="editCampaign(campaign)">编辑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <SingleTabBar current="/single/home" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { AdCampaign } from '@/types'
import SingleTabBar from '@/components/SingleTabBar.vue'

const router = useRouter()
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
  router.push('/single/profile')
}

const goToStats = () => {
  router.push('/single/stats')
}

const createCampaign = () => {
  alert('新建投放计划')
}

const toggleCampaign = (campaign: AdCampaign) => {
  const newStatus = campaign.status === 'running' ? '已暂停' : '投放中'
  alert(`${campaign.name}已${newStatus}`)
}

const editCampaign = (campaign: AdCampaign) => {
  alert(`编辑${campaign.name}`)
}
</script>

<style lang="scss" scoped>
.single-home-container {
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

.current-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: -16px 24px 16px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.account-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.status-tag {
  font-size: 12px;
  padding: 6px 12px;
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

.summary-cards {
  display: flex;
  padding: 0 24px;
  gap: 12px;
  margin-bottom: 20px;
}

.summary-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 10px;
  
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
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.section {
  padding: 0 24px;
  margin-bottom: 20px;
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

.add-btn {
  background: #4080ff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
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

.campaign-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.campaign-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.campaign-status {
  font-size: 12px;
  padding: 4px 10px;
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
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 12px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}

.campaign-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  background: #4080ff;
  color: #fff;
  border: none;
  cursor: pointer;
  
  &.secondary {
    background: #f0f0f0;
    color: #666;
  }
  
  &.active {
    background: #faad14;
  }
}
</style>
