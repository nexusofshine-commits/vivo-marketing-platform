<template>
  <div class="stats-container" style="padding-bottom: 80px;">
    <div class="period-selector">
      <div
        class="period-item"
        :class="{ active: activePeriod === 'week' }"
        @click="activePeriod = 'week'"
      >
        近7天
      </div>
      <div
        class="period-item"
        :class="{ active: activePeriod === 'month' }"
        @click="activePeriod = 'month'"
      >
        近30天
      </div>
      <div
        class="period-item"
        :class="{ active: activePeriod === 'quarter' }"
        @click="activePeriod = 'quarter'"
      >
        近90天
      </div>
    </div>
    
    <div class="container">
      <div class="summary-cards">
        <div class="summary-card">
          <span class="card-value">¥{{ totalSpend.toFixed(2) }}</span>
          <span class="card-label">总花费</span>
        </div>
        <div class="summary-card">
          <span class="card-value">{{ totalImpressions.toLocaleString() }}</span>
          <span class="card-label">总曝光</span>
        </div>
        <div class="summary-card">
          <span class="card-value">{{ totalClicks }}</span>
          <span class="card-label">总点击</span>
        </div>
        <div class="summary-card">
          <span class="card-value">{{ totalConversions }}</span>
          <span class="card-label">总转化</span>
        </div>
      </div>
      
      <div class="chart-section">
        <div class="section-header">
          <span class="section-title">趋势图表</span>
        </div>
        <div class="chart-card">
          <div class="chart-container">
            <div class="y-axis">
              <span class="y-label">高</span>
              <span class="y-label">中</span>
              <span class="y-label">低</span>
            </div>
            <div class="chart-area">
              <div class="bar-chart">
                <div
                  v-for="(item, idx) in stats"
                  :key="idx"
                  class="bar-item"
                >
                  <div
                    class="bar spend"
                    :style="{ height: (item.spend / maxSpend * 100) + '%' }"
                  ></div>
                  <div
                    class="bar clicks"
                    :style="{ height: (item.clicks / maxClicks * 100) + '%' }"
                  ></div>
                  <span class="bar-label">{{ item.date }}</span>
                </div>
              </div>
              <div class="legend">
                <div class="legend-item">
                  <div class="legend-dot spend"></div>
                  <span>花费</span>
                </div>
                <div class="legend-item">
                  <div class="legend-dot clicks"></div>
                  <span>点击</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="metrics-section">
        <div class="section-header">
          <span class="section-title">核心指标</span>
        </div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon ctr">📊</div>
            <div class="metric-info">
              <span class="metric-value">{{ avgCTR.toFixed(2) }}%</span>
              <span class="metric-label">平均CTR</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon cpc">💰</div>
            <div class="metric-info">
              <span class="metric-value">¥{{ avgCPC.toFixed(2) }}</span>
              <span class="metric-label">平均CPC</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon cpa">🎯</div>
            <div class="metric-info">
              <span class="metric-value">¥{{ avgCPA.toFixed(2) }}</span>
              <span class="metric-label">平均CPA</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon roi">📈</div>
            <div class="metric-info">
              <span class="metric-value">{{ roi.toFixed(1) }}:1</span>
              <span class="metric-label">ROI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <SingleTabBar current="/single/stats" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockStats } from '@/data/mock'
import SingleTabBar from '@/components/SingleTabBar.vue'

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
</script>

<style lang="scss" scoped>
.stats-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.period-selector {
  display: flex;
  background: #fff;
  padding: 12px 24px;
  gap: 12px;
}

.period-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
  
  &.active {
    background: #4080ff;
    color: #fff;
  }
}

.summary-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
}

.summary-card {
  width: calc(50% - 6px);
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.card-label {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.chart-section {
  margin-bottom: 20px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.chart-container {
  display: flex;
  height: 200px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 12px;
}

.y-label {
  font-size: 11px;
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
  gap: 10px;
}

.bar-item {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  height: 100%;
}

.bar {
  width: 14px;
  border-radius: 3px 3px 0 0;
  
  &.spend {
    background: #4080ff;
  }
  
  &.clicks {
    background: #52c41a;
  }
}

.bar-label {
  font-size: 10px;
  color: #999;
  margin-top: 6px;
  text-align: center;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  margin-right: 6px;
  
  &.spend {
    background: #4080ff;
  }
  
  &.clicks {
    background: #52c41a;
  }
}

.metrics-section {
  margin-bottom: 20px;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  
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
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
