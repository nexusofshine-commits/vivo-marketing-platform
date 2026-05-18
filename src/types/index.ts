export interface User {
  id: string
  name: string
  avatar: string
  uuid: string
  accountType: 'single' | 'multi'
}

export interface AdAccount {
  id: string
  name: string
  platform: string
  status: 'active' | 'inactive' | 'pending'
  balance: number
  spendToday: number
  impressions: number
  clicks: number
  ctr: number
}

export interface AdCampaign {
  id: string
  name: string
  accountId: string
  status: 'running' | 'paused' | 'ended'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  cpa: number
}

export interface DiagnosisResult {
  id: string
  accountId: string
  accountName: string
  status: 'healthy' | 'warning' | 'error'
  issues: DiagnosisIssue[]
  suggestions: string[]
}

export interface DiagnosisIssue {
  type: 'budget' | 'bid' | 'creative' | 'targeting' | 'delivery'
  severity: 'low' | 'medium' | 'high'
  message: string
}

export interface StatData {
  date: string
  impressions: number
  clicks: number
  spend: number
  conversions: number
}
