import type { User, AdAccount, AdCampaign, DiagnosisResult, StatData } from '@/types'

export const mockUserMulti: User = {
  id: '1',
  name: '张三',
  avatar: '',
  uuid: 'user_202401010001',
  accountType: 'multi'
}

export const mockUserSingle: User = {
  id: '2',
  name: '李四',
  avatar: '',
  uuid: 'user_202401010002',
  accountType: 'single'
}

export const mockAccounts: AdAccount[] = [
  {
    id: 'acc001',
    name: '微信广告账户',
    platform: '微信',
    status: 'active',
    balance: 12500.50,
    spendToday: 890.32,
    impressions: 12500,
    clicks: 890,
    ctr: 7.12
  },
  {
    id: 'acc002',
    name: '抖音广告账户',
    platform: '抖音',
    status: 'active',
    balance: 8750.00,
    spendToday: 1250.80,
    impressions: 25800,
    clicks: 1560,
    ctr: 6.05
  },
  {
    id: 'acc003',
    name: '小红书广告账户',
    platform: '小红书',
    status: 'inactive',
    balance: 3200.00,
    spendToday: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0
  },
  {
    id: 'acc004',
    name: '微博广告账户',
    platform: '微博',
    status: 'pending',
    balance: 5000.00,
    spendToday: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0
  }
]

export const mockCampaigns: AdCampaign[] = [
  {
    id: 'camp001',
    name: '春季新品推广',
    accountId: 'acc001',
    status: 'running',
    budget: 5000,
    spent: 3250.80,
    impressions: 8500,
    clicks: 620,
    conversions: 35,
    ctr: 7.29,
    cpc: 5.24,
    cpa: 92.88
  },
  {
    id: 'camp002',
    name: '品牌曝光计划',
    accountId: 'acc002',
    status: 'running',
    budget: 8000,
    spent: 4580.00,
    impressions: 18500,
    clicks: 980,
    conversions: 28,
    ctr: 5.30,
    cpc: 4.67,
    cpa: 163.57
  },
  {
    id: 'camp003',
    name: '会员日活动',
    accountId: 'acc001',
    status: 'paused',
    budget: 3000,
    spent: 1250.00,
    impressions: 4200,
    clicks: 280,
    conversions: 15,
    ctr: 6.67,
    cpc: 4.46,
    cpa: 83.33
  },
  {
    id: 'camp004',
    name: '新品发布会预热',
    accountId: 'acc002',
    status: 'ended',
    budget: 10000,
    spent: 10000,
    impressions: 35000,
    clicks: 2200,
    conversions: 120,
    ctr: 6.29,
    cpc: 4.55,
    cpa: 83.33
  }
]

export const mockDiagnosisResults: DiagnosisResult[] = [
  {
    id: 'dia001',
    accountId: 'acc001',
    accountName: '微信广告账户',
    status: 'healthy',
    issues: [],
    suggestions: ['账户运行正常', '建议继续保持当前投放策略']
  },
  {
    id: 'dia002',
    accountId: 'acc002',
    accountName: '抖音广告账户',
    status: 'warning',
    issues: [
      { type: 'bid', severity: 'medium', message: '部分关键词出价偏低，可能影响曝光量' },
      { type: 'creative', severity: 'low', message: '创意素材新鲜度不足，建议更新' }
    ],
    suggestions: ['提高核心关键词出价', '定期更新广告创意', '优化落地页转化率']
  },
  {
    id: 'dia003',
    accountId: 'acc003',
    accountName: '小红书广告账户',
    status: 'error',
    issues: [
      { type: 'delivery', severity: 'high', message: '账户已暂停投放，请检查账户状态' },
      { type: 'budget', severity: 'medium', message: '账户余额不足，影响投放' }
    ],
    suggestions: ['联系平台客服恢复账户', '及时充值账户余额']
  }
]

export const mockStats: StatData[] = [
  { date: '05-10', impressions: 15200, clicks: 1080, spend: 4580, conversions: 65 },
  { date: '05-11', impressions: 18500, clicks: 1320, spend: 5680, conversions: 78 },
  { date: '05-12', impressions: 16800, clicks: 1150, spend: 4920, conversions: 68 },
  { date: '05-13', impressions: 21200, clicks: 1580, spend: 6850, conversions: 92 },
  { date: '05-14', impressions: 19500, clicks: 1420, spend: 6120, conversions: 85 },
  { date: '05-15', impressions: 22800, clicks: 1650, spend: 7280, conversions: 98 },
  { date: '05-16', impressions: 18200, clicks: 1280, spend: 5450, conversions: 72 }
]
