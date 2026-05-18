<template>
  <div class="login-container">
    <div class="logo-section">
      <div class="logo">
        <span class="logo-icon">📊</span>
      </div>
      <h1 class="app-title">广告投放管理</h1>
      <p class="app-subtitle">一站式多平台广告管理解决方案</p>
    </div>
    
    <div class="login-form">
      <div class="form-item">
        <label class="form-label">账号类型</label>
        <div class="radio-group">
          <div
            class="radio-item"
            :class="{ active: accountType === 'multi' }"
            @click="accountType = 'multi'"
          >
            <div class="radio-dot"></div>
            <span>多账户版</span>
          </div>
          <div
            class="radio-item"
            :class="{ active: accountType === 'single' }"
            @click="accountType = 'single'"
          >
            <div class="radio-dot"></div>
            <span>单账户版</span>
          </div>
        </div>
      </div>
      
      <div class="qrcode-section">
        <div class="qrcode-placeholder">
          <span class="qrcode-icon">📱</span>
          <span class="qrcode-text">扫码登录</span>
        </div>
        <p class="qrcode-hint">请使用企业微信/微信扫码登录</p>
      </div>
      
      <button class="btn-primary login-btn" @click="handleLogin">登录</button>
      
      <div class="link-row">
        <span class="link-text" @click="goToBind">账号绑定</span>
      </div>
    </div>
    
    <div class="footer">
      <span class="footer-text">© 2024 广告投放管理系统</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { mockUserMulti, mockUserSingle, mockAccounts, mockCampaigns, mockDiagnosisResults } from '@/data/mock'

const accountType = ref<'multi' | 'single'>('multi')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  if (accountType.value === 'multi') {
    userStore.setUser(mockUserMulti)
    userStore.setAccounts(mockAccounts)
    userStore.setCampaigns(mockCampaigns)
    userStore.setDiagnosisResults(mockDiagnosisResults)
    router.push('/multi/home')
  } else {
    userStore.setUser(mockUserSingle)
    userStore.setAccounts(mockAccounts.slice(0, 1))
    userStore.setCampaigns(mockCampaigns.slice(0, 2))
    router.push('/single/home')
  }
}

const goToBind = () => {
  router.push('/bind')
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #4080ff 0%, #6b9dff 100%);
  padding: 30px;
  box-sizing: border-box;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 40px;
}

.logo {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 50px;
}

.app-title {
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
}

.app-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  
  &.active {
    background: #e8f0ff;
    border-color: #4080ff;
  }
}

.radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #999;
  margin-right: 8px;
  
  .active & {
    background: #4080ff;
    border-color: #4080ff;
  }
}

.qrcode-section {
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0;
}

.qrcode-placeholder {
  width: 140px;
  height: 140px;
  background: #f5f5f5;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.qrcode-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.qrcode-text {
  font-size: 14px;
  color: #666;
}

.qrcode-hint {
  font-size: 12px;
  color: #999;
}

.login-btn {
  margin-top: 10px;
  font-size: 16px;
}

.link-row {
  text-align: center;
  margin-top: 20px;
}

.link-text {
  font-size: 14px;
  color: #4080ff;
  cursor: pointer;
}

.footer {
  text-align: center;
  padding-top: 40px;
}

.footer-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
