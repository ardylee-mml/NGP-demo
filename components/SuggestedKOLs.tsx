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

const SAMPLE_KOLS = [
  {
    id: 1,
    name: "James Bond",
    stats: "Followers: 2.5M, Engagement Rate: 4.8%, Main Platform: Instagram",
    image: "/characters/JamesBond.png",
  },
  {
    id: 2,
    name: "ROSÉ",
    stats: "Followers: 3.8M, Engagement Rate: 7.2%, Main Platform: TikTok",
    image: "/characters/rose.png",
  },
  {
    id: 3,
    name: "Eminem",
    stats: "Followers: 5.1M, Engagement Rate: 6.5%, Main Platform: Twitter",
    image: "/characters/eminem.png",
  },
  {
    id: 4,
    name: "Nicki",
    stats: "Followers: 4.2M, Engagement Rate: 5.9%, Main Platform: Instagram",
    image: "/characters/Nicki.png",
  }
]

export function SuggestedKOLs() {
  const { campaignDetails } = useMarketingCampaign()
  const [kols, setKols] = useState(SAMPLE_KOLS.map((kol) => ({ ...kol, selected: false })))

  // Filter KOLs based on campaign details
  const filteredKOLs = kols.filter(kol => {
    const stats = kol.stats.toLowerCase()
    const region = campaignDetails.targetRegion?.toLowerCase() || ''
    const audience = campaignDetails.targetAudience?.toLowerCase() || ''

    return stats.includes(region) ||
           stats.includes(audience) ||
           stats.includes('engagement')
  })

  const handleKolSelection = (id: number) => {
    setKols(kols.map((kol) => (kol.id === id ? { ...kol, selected: !kol.selected } : kol)))
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="border-b border-[#d2d2d7]">
        <CardTitle className="text-[#1d1d1f] text-xl font-semibold">Suggested KOLs</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredKOLs.map((kol) => (
            <div
              key={kol.id}
              className="flex items-start gap-3 p-2 rounded-xl bg-[#f5f5f7] transition-transform hover:-translate-y-0.5"
            >
              <img
                src={kol.image || "/placeholder.svg"}
                alt={kol.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-grow min-w-0 py-0.5">
                <h3 className="text-[#1d1d1f] font-medium text-sm mb-0.5 line-clamp-2">{kol.name}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-[#86868b] text-xs truncate">
                        {truncateText(kol.stats, 25)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px] p-3">
                      <p className="text-sm">{kol.stats}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Checkbox
                id={`kol-${kol.id}`}
                checked={kol.selected}
                onCheckedChange={() => handleKolSelection(kol.id)}
                className="flex-shrink-0 mt-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

