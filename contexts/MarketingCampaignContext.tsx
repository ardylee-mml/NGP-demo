"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface MarketingCampaign {
  objective?: string
  targetAudience?: string
  targetRegion?: string
  isComplete?: boolean
}

interface MarketingCampaignContextType {
  campaignDetails: MarketingCampaign
  setCampaignDetails: (details: MarketingCampaign) => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const MarketingCampaignContext = createContext<MarketingCampaignContextType | undefined>(undefined)

export function MarketingCampaignProvider({ children }: { children: ReactNode }) {
  const [campaignDetails, setCampaignDetails] = useState<MarketingCampaign>({})
  const [isComplete, setIsComplete] = useState(false)

  return (
    <MarketingCampaignContext.Provider value={{ 
      campaignDetails, 
      setCampaignDetails,
      isComplete,
      setIsComplete
    }}>
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