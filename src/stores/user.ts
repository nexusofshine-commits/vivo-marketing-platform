import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, AdAccount, AdCampaign, DiagnosisResult } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const accounts = ref<AdAccount[]>([])
  const campaigns = ref<AdCampaign[]>([])
  const diagnosisResults = ref<DiagnosisResult[]>([])

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const setAccounts = (newAccounts: AdAccount[]) => {
    accounts.value = newAccounts
  }

  const setCampaigns = (newCampaigns: AdCampaign[]) => {
    campaigns.value = newCampaigns
  }

  const setDiagnosisResults = (results: DiagnosisResult[]) => {
    diagnosisResults.value = results
  }

  const logout = () => {
    user.value = null
    accounts.value = []
    campaigns.value = []
    diagnosisResults.value = []
  }

  return {
    user,
    accounts,
    campaigns,
    diagnosisResults,
    setUser,
    setAccounts,
    setCampaigns,
    setDiagnosisResults,
    logout
  }
})
