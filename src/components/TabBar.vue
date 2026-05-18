<template>
  <div class="tab-bar">
    <div
      v-for="item in tabs"
      :key="item.path"
      class="tab-item"
      :class="{ active: current === item.path }"
      @click="switchTab(item.path)"
    >
      <span class="tab-icon">{{ item.icon }}</span>
      <span class="tab-text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  current: string
}>()

const router = useRouter()

const tabs = [
  { path: '/multi/home', text: '首页', icon: '🏠' },
  { path: '/multi/accounts', text: '账户', icon: '📊' },
  { path: '/multi/diagnosis', text: '诊断', icon: '🔍' },
  { path: '/multi/profile', text: '我的', icon: '👤' }
]

const switchTab = (path: string) => {
  if (props.current === path) return
  router.push(path)
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  padding: 10px 0;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &.active {
    .tab-text {
      color: #4080ff;
    }
  }
}

.tab-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.tab-text {
  font-size: 12px;
  color: #999;
}
</style>
