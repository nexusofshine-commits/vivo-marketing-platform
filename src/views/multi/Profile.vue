<template>
  <div class="profile-container" style="padding-bottom: 80px;">
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
          <span>{{ user?.accountType === 'multi' ? '多账户版' : '单账户版' }}</span>
        </div>
      </div>
    </div>
    
    <div class="menu-section">
      <div class="menu-list">
        <div class="menu-item" @click="handleMenuClick('accounts')">
          <div class="menu-icon accounts">📊</div>
          <span class="menu-text">账户管理</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('statistics')">
          <div class="menu-icon stats">📈</div>
          <span class="menu-text">数据统计</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('diagnosis')">
          <div class="menu-icon diagnosis">🔍</div>
          <span class="menu-text">智能诊断</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('bind')">
          <div class="menu-icon bind">🔗</div>
          <span class="menu-text">账号绑定</span>
          <span class="menu-arrow">›</span>
        </div>
      </div>
    </div>
    
    <div class="menu-section">
      <div class="menu-list">
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
    
    <TabBar current="/multi/profile" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const handleMenuClick = (type: string) => {
  switch (type) {
    case 'accounts':
      router.push('/multi/accounts')
      break
    case 'diagnosis':
      router.push('/multi/diagnosis')
      break
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
.profile-container {
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

.menu-section {
  margin: 16px 24px;
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
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 16px;
  
  &.accounts {
    background: #e8f5e9;
  }
  
  &.stats {
    background: #e3f2fd;
  }
  
  &.diagnosis {
    background: #fff3e0;
  }
  
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
  font-size: 15px;
  color: #333;
}

.menu-arrow {
  font-size: 20px;
  color: #ccc;
}

.action-section {
  padding: 0 24px;
}

.action-item {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  text-align: center;
  margin-bottom: 12px;
  cursor: pointer;
  
  &.logout {
    background: #fff5f5;
    
    .action-text {
      color: #ff4d4f;
    }
  }
}

.action-text {
  font-size: 15px;
  color: #333;
}
</style>
