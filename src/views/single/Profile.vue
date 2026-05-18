<template>
  <div class="single-profile-container" style="padding-bottom: 80px;">
    <div class="profile-header">
      <div class="user-card">
        <div class="avatar">
          <span class="avatar-icon">👤</span>
        </div>
        <div class="user-info">
          <span class="user-name">{{ user?.name || '用户' }}</span>
          <span class="user-uuid">UUID: {{ user?.uuid || '' }}</span>
        </div>
        <div class="account-type">
          <span>单账户版</span>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="current-account-card">
        <div class="account-header">
          <span class="account-title">当前账户</span>
          <div class="account-status" :class="currentAccount?.status">
            {{ getStatusText(currentAccount?.status) }}
          </div>
        </div>
        <span class="account-name">{{ currentAccount?.name || '未绑定账户' }}</span>
        <div class="account-metrics">
          <div class="account-metric">
            <span class="metric-value">¥{{ currentAccount?.balance.toFixed(2) || '0.00' }}</span>
            <span class="metric-label">账户余额</span>
          </div>
          <div class="account-metric">
            <span class="metric-value">{{ currentAccount?.ctr }}%</span>
            <span class="metric-label">点击率</span>
          </div>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-list">
          <div class="menu-item" @click="handleMenuClick('bind')">
            <div class="menu-icon bind">🔗</div>
            <span class="menu-text">账号绑定</span>
            <span class="menu-arrow">›</span>
          </div>
          <div class="menu-item" @click="handleMenuClick('settings')">
            <div class="menu-icon settings">⚙️</div>
            <span class="menu-text">设置</span>
            <span class="menu-arrow">›</span>
          </div>
          <div class="menu-item" @click="handleMenuClick('help')">
            <div class="menu-icon help">❓</div>
            <span class="menu-text">帮助与反馈</span>
            <span class="menu-arrow">›</span>
          </div>
          <div class="menu-item" @click="handleMenuClick('about')">
            <div class="menu-icon about">ℹ️</div>
            <span class="menu-text">关于我们</span>
            <span class="menu-arrow">›</span>
          </div>
        </div>
      </div>
      
      <div class="action-section">
        <div class="action-item" @click="switchAccount">
          <span class="action-text">切换登录账户</span>
        </div>
        <div class="action-item logout" @click="handleLogout">
          <span class="action-text">退出登录</span>
        </div>
      </div>
    </div>
    
    <SingleTabBar current="/single/profile" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import SingleTabBar from '@/components/SingleTabBar.vue'

const router = useRouter()
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
      router.push('/bind')
      break
    case 'settings':
    case 'help':
    case 'about':
      alert(`即将打开${type === 'settings' ? '设置' : type === 'help' ? '帮助与反馈' : '关于我们'}`)
      break
  }
}

const switchAccount = () => {
  alert('切换账户')
}

const handleLogout = () => {
  if (confirm('确定要退出当前账户吗？')) {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.single-profile-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.profile-header {
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  padding: 30px 24px;
  padding-top: calc(40px + env(safe-area-inset-top));
}

.user-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.avatar-icon {
  font-size: 32px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.user-uuid {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 6px;
}

.account-type {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
}

.current-account-card {
  background: #fff;
  margin: -16px 0 16px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.account-title {
  font-size: 13px;
  color: #999;
}

.account-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 8px;
  
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
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  display: block;
}

.account-metrics {
  display: flex;
  gap: 24px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.account-metric {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.menu-section {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
}

.menu-icon {
  width: 40px;
  height: 4