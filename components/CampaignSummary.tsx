"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext"

export function CampaignSummary() {
  const { campaignDetails, isComplete } = useMarketingCampaign()

  if (!isComplete) return null

  const getStrategyExplanation = () => {
    const objective = campaignDetails.objective?.toLowerCase() || ''
    const audience = campaignDetails.targetAudience?.toLowerCase() || ''
    const region = campaignDetails.targetRegion?.toLowerCase() || ''

    return {
      gameStrategy: objective.includes('awareness') ?
        "High DAU games for maximum visibility and brand exposure" :
        objective.includes('launch') ?
        "Games with virtual event capabilities for product showcases" :
        "Games with strong social features for engagement",

      audienceMatch: audience.includes('young') || audience.includes('teen') ?
        "Social and competitive games to engage younger audiences" :
        "Professional and simulation games for mature audiences",

      regionalFocus: region.includes('asia') ?
        "Focus on mobile-friendly games popular in Asian markets" :
        region.includes('europe') ?
        "Emphasis on PC and console titles strong in European markets" :
        "Mix of platforms to reach diverse regional preferences"
    }
  }

  const strategy = getStrategyExplanation()

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="border-b border-[#d2d2d7]">
        <CardTitle className="text-[#1d1d1f] text-xl font-semibold">Campaign Strategy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Campaign Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#1d1d1f]">Objective</h3>
            <p className="text-sm text-[#86868b]">{campaignDetails.objective}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#1d1d1f]">Target Audience</h3>
            <p className="text-sm text-[#86868b]">{campaignDetails.targetAudience}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-[#1d1d1f]">Target Region</h3>
            <p className="text-sm text-[#86868b]">{campaignDetails.targetRegion}</p>
          </div>
        </div>

        {/* Strategy Explanation */}
        <div className="space-y-3 border-t border-[#d2d2d7] pt-4">
          <h3 className="text-sm font-medium text-[#1d1d1f]">Recommendation Strategy</h3>
          <div className="space-y-2">
            <p className="text-sm text-[#86868b]">• {strategy.gameStrategy}</p>
            <p className="text-sm text-[#86868b]">• {strategy.audienceMatch}</p>
            <p className="text-sm text-[#86868b]">• {strategy.regionalFocus}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 