"use client"

import CampaignPlanner from '@/components/CampaignPlanner'
import { MarketingCampaignProvider } from "@/contexts/MarketingCampaignContext"

export default function Home() {
  return (
    <MarketingCampaignProvider>
      <main className="min-h-screen bg-[#f5f5f7]">
        <CampaignPlanner />
      </main>
    </MarketingCampaignProvider>
  )
}

