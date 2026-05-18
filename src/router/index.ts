import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/multi/home', component: () => import('@/views/multi/Home.vue') },
  { path: '/multi/accounts', component: () => import('@/views/multi/Accounts.vue') },
  { path: '/multi/diagnosis', component: () => import('@/views/multi/Diagnosis.vue') },
  { path: '/multi/profile', component: () => import('@/views/multi/Profile.vue') },
  { path: '/single/home', component: () => import('@/views/single/Home.vue') },
  { path: '/single/stats', component: () => import('@/views/single/Stats.vue') },
  { path: '/single/profile', component: () => import('@/views/single/Profile.vue') },
  { path: '/bind', component: () => import('@/views/Bind.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
