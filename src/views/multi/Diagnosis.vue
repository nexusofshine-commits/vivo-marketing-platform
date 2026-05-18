<template>
  <div class="diagnosis-container" style="padding-bottom: 80px;">
    <div class="summary-section">
      <div class="summary-item" :class="overallStatus">
        <div class="summary-icon">{{ getStatusIcon(overallStatus) }}</div>
        <div class="summary-content">
          <span class="summary-title">整体健康度</span>
          <span class="summary-value">{{ getOverallStatusText() }}</span>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="section">
        <div class="section-header">
          <span class="section-title">诊断结果</span>
          <div class="refresh-btn" @click="refreshDiagnosis">
            <span class="refresh-icon">🔄</span>
            <span>刷新</span>
          </div>
        </div>
        
        <div class="diagnosis-list">
          <div
            v-for="result in diagnosisResults"
            :key="result.id"
            class="diagnosis-card"
            :class="result.status"
            @click="toggleExpand(result.id)"
          >
            <div class="diagnosis-header">
              <div class="diagnosis-left">
                <div class="status-dot" :class="result.status"></div>
                <span class="diagnosis-name">{{ result.accountName }}</span>
              </div>
              <div class="diagnosis-right">
                <span class="diagnosis-status">{{ getStatusText(result.status) }}</span>
                <span class="expand-icon">{{ expandedId === result.id ? '▼' : '▶' }}</span>
              </div>
            </div>
            
            <div class="diagnosis-detail" v-if="expandedId === result.id">
              <div class="issues-section" v-if="result.issues.length > 0">
                <span class="detail-title">发现问题</span>
                <div class="issues-list">
                  <div
                    v-for="(issue, idx) in result.issues"
                    :key="idx"
                    class="issue-item"
                  >
                    <div class="issue-severity" :class="issue.severity">
                      {{ getSeverityText(issue.severity) }}
                    </div>
                    <span class="issue-message">{{ issue.message }}</span>
                  </div>
                </div>
              </div>
              
              <div class="suggestions-section">
                <span class="detail-title">优化建议</span>
                <div class="suggestions-list">
                  <div v-for="(suggestion, idx) in result.suggestions" :key="idx" class="suggestion-item">
                    <span class="suggestion-num">{{ idx + 1 }}</span>
                    <span class="suggestion-text">{{ suggestion }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tips-section">
        <div class="tips-card">
          <span class="tips-icon">💡</span>
          <div class="tips-content">
            <span class="tips-title">诊断小贴士</span>
            <span class="tips-text">智能诊断会定期检查您的广告账户，及时发现潜在问题并提供优化建议。建议每周查看一次诊断结果，确保广告投放效果最佳。</span>
          </div>
        </div>
      </div>
    </div>
    
    <TabBar current="/multi/diagnosis" />
  </div>
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
  const count = diagnosisResults.value.length
  const healthyCount = diagnosisResults.value.filter(r => r.status === 'healthy').length
  
  if (overallStatus.value === 'healthy') return `全部 ${count} 个账户运行正常`
  if (overallStatus.value === 'warning') return `${healthyCount}/${count} 账户正常，部分需关注`
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
  alert('诊断已完成！')
}
</script>

<style lang="scss" scoped>
.diagnosis-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.summary-section {
  padding: 20px 24px;
}

.summary-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-left: 8px solid;
  
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
  font-size: 40px;
  margin-right: 20px;
}

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.summary-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.section {
  margin-bottom: 24px;
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

.refresh-btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4080ff;
  cursor: pointer;
}

.refresh-icon {
  margin-right: 6px;
}

.diagnosis-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.diagnosis-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  
  &.warning {
    border-left: 4px solid #faad14;
  }
  
  &.error {
    border-left: 4px solid #ff4d4f;
  }
  
  &.healthy {
    border-left: 4px solid #52c41a;
  }
}

.diagnosis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.diagnosis-left {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  
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
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.diagnosis-right {
  display: flex;
  align-items: center;
}

.diagnosis-status {
  font-size: 12px;
  color: #999;
  margin-right: 8px;
}

.expand-icon {
  font-size: 12px;
  color: #999;
}

.diagnosis-detail {
  padding: 0 16px 16px;
  border-top: 1px solid #f0f0f0;
  margin-top: 0;
  padding-top: 16px;
}

.detail-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.issues-section {
  margin-bottom: 20px;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.issue-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
}

.issue-severity {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  margin-right: 10px;
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
  font-size: 13px;
  color: #666;
  flex: 1;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
}

.suggestion-num {
  width: 28px;
  height: 28px;
  background: #4080ff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 10px;
  flex-shrink: 0;
}

.suggestion-text {
  font-size: 13px;
  color: #666;
  flex: 1;
}

.tips-section {
  margin-top: 24px;
}

.tips-card {
  display: flex;
  background: linear-gradient(135deg, #4080ff 0%, #6b9dff 100%);
  border-radius: 16px;
  padding: 16px;
}

.tips-icon {
  font-size: 32px;
  margin-right: 12px;
}

.tips-content {
  display: flex;
  flex-direction: column;
}

.tips-title {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px;
}

.tips-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
</style>
