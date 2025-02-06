"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext"

const CampaignSummary = ({ info }: { info: any }) => {
  const getStrategyExplanation = () => {
    const objective = info.objective?.toLowerCase() || ''
    const audience = info.target?.toLowerCase() || ''
    const region = info.region?.toLowerCase() || ''

    return {
      gameStrategy: objective.includes('launch') 
        ? "Focus on games with virtual event capabilities for product showcases"
        : objective.includes('awareness')
        ? "Target high DAU games for maximum visibility and brand exposure"
        : "Leverage games with strong social features for engagement",

      audienceMatch: audience.includes('stem') || audience.includes('tech')
        ? "Prioritize educational and simulation games"
        : audience.includes('young')
        ? "Focus on social and competitive games"
        : "Balance of casual and core gaming experiences",

      regionalFocus: region.includes('asia')
        ? "Emphasis on mobile-first games popular in Asian markets"
        : region.includes('usa')
        ? "Mix of PC and mobile titles strong in Western markets"
        : "Diverse platform approach for global reach"
    }
  }

  const strategy = getStrategyExplanation()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Campaign Strategy</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-gray-600">Objective</h3>
            <p>{info.objective}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Target Audience</h3>
            <p>{info.target}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Region</h3>
            <p>{info.region}</p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-600 mb-3">Recommended Strategy</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• {strategy.gameStrategy}</p>
            <p>• {strategy.audienceMatch}</p>
            <p>• {strategy.regionalFocus}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignSummary 