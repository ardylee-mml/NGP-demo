"use client"

import { createContext, useContext, useState } from "react"
import { Game } from '@/lib/gameDatabase'
import { KOL } from '@/lib/kolDatabase'

interface CampaignDetails {
  objective: string
  target: string
  region: string
  recommendations?: {
    strategy: string
    games: Game[]
    kols: KOL[]
    analysis: {
      marketStrategy: {
        reasoning: string[]
        strategies: string[]
      }
      gameSelection: {
        reasoning: string[]
        selectedGames: Game[]
        matchCriteria: any[]
      }
      kolSelection: {
        reasoning: string[]
        selectedKOLs: KOL[]
        matchCriteria: any[]
      }
    }
  }
}

interface MarketingCampaignContextType {
  campaignDetails: CampaignDetails
  setCampaignDetails: (details: CampaignDetails) => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const MarketingCampaignContext = createContext<MarketingCampaignContextType | undefined>(undefined)

export function MarketingCampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
    objective: '',
    target: '',
    region: ''
  })
  const [isComplete, setIsComplete] = useState(false)

  return (
    <MarketingCampaignContext.Provider 
      value={{
        campaignDetails,
        setCampaignDetails,
        isComplete,
        setIsComplete
      }}
    >
      {children}
    </MarketingCampaignContext.Provider>
  )
}

export function useMarketingCampaign() {
  const context = useContext(MarketingCampaignContext)
  if (context === undefined) {
    throw new Error('useMarketingCampaign must be used within a MarketingCampaignProvider')
  }
  return context
} 