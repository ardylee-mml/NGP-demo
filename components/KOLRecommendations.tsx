"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext"
import { KOL, kols } from "@/lib/kolDatabase"

export function KOLRecommendations() {
  const { campaignDetails } = useMarketingCampaign()
  const [selectedKOLs, setSelectedKOLs] = useState(kols.map((kol) => ({ 
    ...kol, 
    selected: false 
  })))

  // Filter and score KOLs based on campaign details
  const filteredKOLs = selectedKOLs.map(kol => {
    let score = 0;
    const objective = campaignDetails?.objective?.toLowerCase() || ''
    const targetRegion = campaignDetails?.targetRegion?.toLowerCase() || ''
    const targetAudience = campaignDetails?.targetAudience?.toLowerCase() || ''

    // Score by region match
    if (kol.regions.some(region => 
      targetRegion.includes(region.toLowerCase()))) score += 3

    // Score by audience match
    if (kol.audience.interests.some(interest => 
      targetAudience.includes(interest.toLowerCase()))) score += 2

    // Score by marketing capabilities
    if (objective.includes('awareness') && 
        kol.marketingCapabilities.some(cap => 
          cap.toLowerCase().includes('brand') || 
          cap.toLowerCase().includes('awareness'))) score += 2

    // Score by engagement rate
    const engagementRate = parseFloat(kol.engagementRate)
    if (engagementRate > 8) score += 3
    else if (engagementRate > 5) score += 2

    return {
      ...kol,
      score
    }
  }).filter(kol => kol.score > 0)
    .sort((a, b) => b.score - a.score)

  const handleKOLSelection = (id: string) => {
    setSelectedKOLs(selectedKOLs.map((kol) => 
      kol.id === id ? { ...kol, selected: !kol.selected } : kol
    ))
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="border-b border-[#d2d2d7]">
        <CardTitle className="text-[#1d1d1f] text-xl font-semibold">
          Recommended KOLs
          <span className="text-sm font-normal text-[#86868b] ml-2">
            {filteredKOLs.length} matches found
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredKOLs.map((kol) => (
            <div
              key={kol.id}
              className="flex items-start gap-3 p-2 rounded-xl bg-[#f5f5f7] transition-transform hover:-translate-y-0.5"
            >
              <img
                src={kol.image}
                alt={kol.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                draggable="false"
              />
              <div className="flex-grow min-w-0 py-0.5">
                <h3 className="text-[#1d1d1f] font-medium text-sm mb-0.5 line-clamp-2">
                  {kol.name} - {kol.characterType}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-[#86868b] text-xs truncate">
                        {kol.personality.join(', ')}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px] p-3">
                      <p className="text-sm">
                        <strong>Type:</strong> {kol.characterType}<br/>
                        <strong>Regions:</strong> {kol.regions.join(', ')}<br/>
                        <strong>Stats:</strong> {kol.stats}<br/>
                        <strong>Marketing:</strong> {kol.marketingCapabilities.join(', ')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Checkbox
                id={`kol-${kol.id}`}
                checked={kol.selected}
                onCheckedChange={() => handleKOLSelection(kol.id)}
                className="flex-shrink-0 mt-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}