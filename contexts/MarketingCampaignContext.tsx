"use client"

import { createContext, useContext, useState } from "react"

interface CampaignDetails {
  objective?: string
  targetAudience?: string
  targetRegion?: string
  budget?: string
}

interface MarketingCampaignContextType {
  campaignDetails: CampaignDetails
  setCampaignDetails: (details: CampaignDetails) => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const MarketingCampaignContext = createContext<MarketingCampaignContextType | undefined>(undefined)

export function MarketingCampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({})
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