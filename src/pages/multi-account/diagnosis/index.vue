<template>
  <view class="diagnosis-container">
    <view class="summary-section">
      <view class="summary-item" :class="overallStatus">
        <view class="summary-icon">{{ getStatusIcon(overallStatus) }}</view>
        <view class="summary-content">
          <text class="summary-title">整体健康度</text>
          <text class="summary-value">{{ getOverallStatusText() }}</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">诊断结果</text>
        <view class="refresh-btn" @click="refreshDiagnosis">
          <text class="refresh-icon">🔄</text>
          <text>刷新</text>
        </view>
      </view>
      
      <view class="diagnosis-list">
        <view 
          v-for="result in diagnosisResults" 
          :key="result.id" 
          class="diagnosis-card"
          :class="result.status"
          @click="toggleExpand(result.id)"
        >
          <view class="diagnosis-header">
            <view class="diagnosis-left">
              <view class="status-dot" :class="result.status"></view>
              <text class="diagnosis-name">{{ result.accountName }}</text>
            </view>
            <view class="diagnosis-right">
              <text class="diagnosis-status">{{ getStatusText(result.status) }}</text>
              <text class="expand-icon">{{ expandedId === result.id ? '▼' : '▶' }}</text>
            </view>
          </view>
          
          <view class="diagnosis-detail" v-if="expandedId === result.id">
            <view class="issues-section" v-if="result.issues.length > 0">
              <text class="detail-title">发现问题</text>
              <view class="issues-list">
                <view 
                  v-for="(issue, idx) in result.issues" 
                  :key="idx" 
                  class="issue-item"
                >
                  <view class="issue-severity" :class="issue.severity">
                    {{ getSeverityText(issue.severity) }}
                  </view>
                  <text class="issue-message">{{ issue.message }}</text>
                </view>
              </view>
            </view>
            
            <view class="suggestions-section">
              <text class="detail-title">优化建议</text>
              <view class="suggestions-list">
                <view v-for="(suggestion, idx) in result.suggestions" :key="idx" class="suggestion-item">
                  <text class="suggestion-num">{{ idx + 1 }}</text>
                  <text class="suggestion-text">{{ suggestion }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="tips-section">
      <view class="tips-card">
        <text class="tips-icon">💡</text>
        <view class="tips-content">
          <text class="tips-title">诊断小贴士</text>
          <text class="tips-text">智能诊断会定期检查您的广告账户，及时发现潜在问题并提供优化建议。建议每周查看一次诊断结果，确保广告投放效果最佳。</text>
        </view>
      </view>
    </view>
    
    <TabBar current="/pages/multi-account/diagnosis/index" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const diagnosisResults = computed(() => userStore.diagnosisResults)
const expandedId = ref<string | null>(null)

const overallStatus = computed(() => {
  const results = diagnosisResults.value
  if (results.some(r => r.status === 'error')) return 'error'
  if (results.some(r => r.status === 'warning')) return 'warning'
  return 'healthy'
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    healthy: '健康',
    warning: '需关注',
    error: '有问题'
  }
  return map[status] || status
}

const getStatusIcon = (status: string) => {
  const map: Record<string, string> = {
    healthy: '✅',
    warning: '⚠️',
    error: '🔴'
  }
  return map[status] || '❓'
}

const getOverallStatusText = () => {
  const status = overallStatus.value
  const count = diagnosisResults.value.length
  const healthyCount = diagnosisResults.value.filter(r => r.status === 'healthy').length
  
  if (status === 'healthy') return `全部 ${count} 个账户运行正常`
  if (status === 'warning') return `${healthyCount}/${count} 账户正常，部分需关注`
  return `${healthyCount}/${count} 账户正常，部分有问题`
}

const getSeverityText = (severity: string) => {
  const map: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高'
  }
  return map[severity] || severity
}

const toggleExpand = (id: string) => {
  expandedId.value = expandedId.value === id ? null : id
}

const refreshDiagnosis = () => {
  uni.showToast({
    title: '诊断完成',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.diagnosis-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.summary-section {
  padding: 30rpx;
}

.summary-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border-left: 8rpx solid;
  
  &.healthy {
    border-left-color: #52c41a;
    background: linear-gradient(90deg, #f6ffed 0%, #fff 100%);
  }
  
  &.warning {
    border-left-color: #faad14;
    background: linear-gradient(90deg, #fffbe6 0%, #fff 100%);
  }
  
  &.error {
    border-left-color: #ff4d4f;
    background: linear-gradient(90deg, #fff1f0 0%, #fff 100%);
  }
}

.summary-icon {
  font-size: 56rpx;
  margin-right: 24rpx;
}

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.summary-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.section {
  padding: 0 30rpx;
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

.refresh-btn {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #4080ff;
}

.refresh-icon {
  margin-right: 8rpx;
}

.diagnosis-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.diagnosis-card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  
  &.warning {
    border-left: 4rpx solid #faad14;
  }
  
  &.error {
    border-left: 4rpx solid #ff4d4f;
  }
  
  &.healthy {
    border-left: 4rpx solid #52c41a;
  }
}

.diagnosis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
}

.diagnosis-left {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  
  &.healthy {
    background: #52c41a;
  }
  
  &.warning {
    background: #faad14;
  }
  
  &.error {
    background: #ff4d4f;
  }
}

.diagnosis-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.diagnosis-right {
  display: flex;
  align-items: center;
}

.diagnosis-status {
  font-size: 24rpx;
  color: #999;
  margin-right: 12rpx;
}

.expand-icon {
  font-size: 20rpx;
  color: #999;
}

.diagnosis-detail {
  padding: 0 24rpx 24rpx;
  border-top: 1rpx solid #f0f0f0;
  margin-top: 0;
  padding-top: 20rpx;
}

.detail-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.issues-section {
  margin-bottom: 24rpx;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.issue-item {
  display: flex;
  align-items: flex-start;
  padding: 16rpx;
  background: #fafafa;
  border-radius: 8rpx;
}

.issue-severity {
  font-size: 20rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
  
  &.high {
    background: #ff4d4f;
    color: #fff;
  }
  
  &.medium {
    background: #faad14;
    color: #fff;
  }
  
  &.low {
    background: #52c41a;
    color: #fff;
  }
}

.issue-message {
  font-size: 26rpx;
  color: #666;
  flex: 1;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
}

.suggestion-num {
  width: 36rpx;
  height: 36rpx;
  background: #4080ff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.suggestion-text {
  font-size: 26rpx;
  color: #666;
  flex: 1;
}

.tips-section {
  padding: 30rpx;
}

.tips-card {
  display: flex;
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  border-radius: 16rpx;
  padding: 24rpx;
}

.tips-icon {
  font-size: 40rpx;
  margin-right: 16rpx;
}

.tips-content {
  display: flex;
  flex-direction: column;
}

.tips-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.tips-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
</style>