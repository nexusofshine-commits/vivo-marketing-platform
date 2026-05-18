<template>
  <view class="stats-container">
    <view class="period-selector">
      <view 
        class="period-item" 
        :class="{ active: activePeriod === 'week' }"
        @click="activePeriod = 'week'"
      >
        近7天
      </view>
      <view 
        class="period-item" 
        :class="{ active: activePeriod === 'month' }"
        @click="activePeriod = 'month'"
      >
        近30天
      </view>
      <view 
        class="period-item" 
        :class="{ active: activePeriod === 'quarter' }"
        @click="activePeriod = 'quarter'"
      >
        近90天
      </view>
    </view>
    
    <view class="summary-cards">
      <view class="summary-card">
        <text class="card-value">¥{{ totalSpend.toFixed(2) }}</text>
        <text class="card-label">总花费</text>
      </view>
      <view class="summary-card">
        <text class="card-value">{{ totalImpressions.toLocaleString() }}</text>
        <text class="card-label">总曝光</text>
      </view>
      <view class="summary-card">
        <text class="card-value">{{ totalClicks }}</text>
        <text class="card-label">总点击</text>
      </view>
      <view class="summary-card">
        <text class="card-value">{{ totalConversions }}</text>
        <text class="card-label">总转化</text>
      </view>
    </view>
    
    <view class="chart-section">
      <view class="section-header">
        <text class="section-title">趋势图表</text>
      </view>
      <view class="chart-card">
        <view class="chart-container">
          <view class="y-axis">
            <text class="y-label">高</text>
            <text class="y-label">中</text>
            <text class="y-label">低</text>
          </view>
          <view class="chart-area">
            <view class="bar-chart">
              <view 
                v-for="(item, idx) in stats" 
                :key="idx" 
                class="bar-item"
              >
                <view 
                  class="bar spend" 
                  :style="{ height: (item.spend / maxSpend * 100) + '%' }"
                ></view>
                <view 
                  class="bar clicks" 
                  :style="{ height: (item.clicks / maxClicks * 100) + '%' }"
                ></view>
                <text class="bar-label">{{ item.date }}</text>
              </view>
            </view>
            <view class="legend">
              <view class="legend-item">
                <view class="legend-dot spend"></view>
                <text>花费</text>
              </view>
              <view class="legend-item">
                <view class="legend-dot clicks"></view>
                <text>点击</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="metrics-section">
      <view class="section-header">
        <text class="section-title">核心指标</text>
      </view>
      <view class="metrics-grid">
        <view class="metric-card">
          <view class="metric-icon ctr">📊</view>
          <view class="metric-info">
            <text class="metric-value">{{ avgCTR.toFixed(2) }}%</text>
            <text class="metric-label">平均CTR</text>
          </view>
        </view>
        <view class="metric-card">
          <view class="metric-icon cpc">💰</view>
          <view class="metric-info">
            <text class="metric-value">¥{{ avgCPC.toFixed(2) }}</text>
            <text class="metric-label">平均CPC</text>
          </view>
        </view>
        <view class="metric-card">
          <view class="metric-icon cpa">🎯</view>
          <view class="metric-info">
            <text class="metric-value">¥{{ avgCPA.toFixed(2) }}</text>
            <text class="metric-label">平均CPA</text>
          </view>
        </view>
        <view class="metric-card">
          <view class="metric-icon roi">📈</view>
          <view class="metric-info">
            <text class="metric-value">{{ roi.toFixed(1) }}:1</text>
            <text class="metric-label">ROI</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="nav-bar">
      <view class="nav-item" @click="goToHome">
        <text class="nav-icon">📊</text>
        <text class="nav-text">投放</text>
      </view>
      <view class="nav-item active">
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
import { ref, computed } from 'vue'
import { mockStats } from '@/data/mock'

const activePeriod = ref('week')
const stats = mockStats

const totalSpend = computed(() => stats.reduce((sum, s) => sum + s.spend, 0))
const totalImpressions = computed(() => stats.reduce((sum, s) => sum + s.impressions, 0))
const totalClicks = computed(() => stats.reduce((sum, s) => sum + s.clicks, 0))
const totalConversions = computed(() => stats.reduce((sum, s) => sum + s.conversions, 0))

const maxSpend = computed(() => Math.max(...stats.map(s => s.spend)))
const maxClicks = computed(() => Math.max(...stats.map(s => s.clicks)))

const avgCTR = computed(() => {
  const total = stats.reduce((sum, s) => sum + (s.clicks / s.impressions * 100), 0)
  return total / stats.length
})

const avgCPC = computed(() => totalSpend.value / totalClicks.value)
const avgCPA = computed(() => totalSpend.value / totalConversions.value)
const roi = computed(() => (totalConversions.value * 100) / totalSpend.value)

const goToHome = () => {
  uni.navigateBack()
}

const goToProfile = () => {
  uni.navigateTo({ url: '/pages/single-account/profile/index' })
}
</script>

<style lang="scss" scoped>
.stats-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.period-selector {
  display: flex;
  background: #fff;
  padding: 16rpx 24rpx;
  gap: 16rpx;
}

.period-item {
  flex: 1;
  text-align: center;
  padding: 16rpx;
  font-size: 28rpx;
  color: #666;
  border-radius: 8rpx;
  background: #f5f5f5;
  
  &.active {
    background: #4080ff;
    color: #fff;
  }
}

.summary-cards {
  display: flex;
  padding: 24rpx;
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

.card-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}

.chart-section {
  padding: 0 24rpx;
  margin-bottom: 24rpx;
}

.section-header {
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.chart-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
}

.chart-container {
  display: flex;
  height: 300rpx;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 16rpx;
}

.y-label {
  font-size: 20rpx;
  color: #999;
}

.chart-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.bar-chart {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 16rpx;
}

.bar-item {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4rpx;
  height: 100%;
}

.bar {
  width: 20rpx;
  border-radius: 4rpx 4rpx 0 0;
  
  &.spend {
    background: #4080ff;
  }
  
  &.clicks {
    background: #52c41a;
  }
}

.bar-label {
  font-size: 18rpx;
  color: #999;
  margin-top: 8rpx;
  text-align: center;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 32rpx;
  margin-top: 16rpx;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #666;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 4rpx;
  margin-right: 8rpx;
  
  &.spend {
    background: #4080ff;
  }
  
  &.clicks {
    background: #52c41a;
  }
}

.metrics-section {
  padding: 0 24rpx;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.metric-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
}

.metric-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 20rpx;
  
  &.ctr {
    background: #e8f0ff;
  }
  
  &.cpc {
    background: #fff7e6;
  }
  
  &.cpa {
    background: #e6f7ff;
  }
  
  &.roi {
    background: #f6ffed;
  }
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
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