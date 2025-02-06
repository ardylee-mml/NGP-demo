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
import { Game, games } from "@/lib/gameDatabase"

export function GameRecommendations() {
  const { campaignDetails } = useMarketingCampaign()
  const [selectedGames, setSelectedGames] = useState(games.map((game) => ({ 
    ...game, 
    selected: false,
    image: `/games/${game.name.replace(/\s+/g, '')}.png` // Convert game name to image path
  })))

  // Update filtering logic to use the new data structure
  const filteredGames = selectedGames.map(game => {
    let score = 0;
    const objective = campaignDetails.objective?.toLowerCase() || ''
    const targetRegion = campaignDetails.targetRegion?.toLowerCase() || ''
    const targetAudience = campaignDetails.targetAudience?.toLowerCase() || ''

    // Score by objective match (using marketingCapabilities instead)
    if (objective.includes('awareness') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('awareness'))) score += 3
    if (objective.includes('launch') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('launch'))) score += 3
    if (objective.includes('brand') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('brand'))) score += 3
    if (objective.includes('social') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('social'))) score += 3

    // Score by region match
    if (game.regions.some(region => targetRegion.includes(region.toLowerCase()))) score += 2

    // Score by audience match
    if (game.audience.interests.some(interest => targetAudience.includes(interest.toLowerCase()))) score += 2

    return {
      ...game,
      score
    }
  }).filter(game => game.score > 0)
    .sort((a, b) => b.score - a.score)

  const handleGameSelection = (id: string) => {
    setSelectedGames(selectedGames.map((game) => 
      game.id === id ? { ...game, selected: !game.selected } : game
    ))
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="border-b border-[#d2d2d7]">
        <CardTitle className="text-[#1d1d1f] text-xl font-semibold">
          Recommended Games
          <span className="text-sm font-normal text-[#86868b] ml-2">
            {filteredGames.length} matches found
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="flex items-start gap-3 p-2 rounded-xl bg-[#f5f5f7] transition-transform hover:-translate-y-0.5"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                draggable="false"
              />
              <div className="flex-grow min-w-0 py-0.5">
                <h3 className="text-[#1d1d1f] font-medium text-sm mb-0.5 line-clamp-2">
                  {game.name}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-[#86868b] text-xs truncate">
                        {game.type.join(', ')}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px] p-3">
                      <p className="text-sm">
                        <strong>Regions:</strong> {game.regions.join(', ')}<br/>
                        <strong>Audience:</strong> {game.audience.ageRange}<br/>
                        <strong>Marketing:</strong> {game.marketingCapabilities.join(', ')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Checkbox
                id={`game-${game.id}`}
                checked={game.selected}
                onCheckedChange={() => handleGameSelection(game.id)}
                className="flex-shrink-0 mt-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

