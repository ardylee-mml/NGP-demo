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

const GameRecommendations = ({ campaignInfo }: { campaignInfo: any }) => {
  const { campaignDetails } = useMarketingCampaign()
  const [selectedGames, setSelectedGames] = useState(games.map((game) => ({ 
    ...game, 
    selected: false,
    image: `/games/${game.name.replace(/\s+/g, '')}.png` // Convert game name to image path
  })))

  // Filter and score games based on campaign details
  const filteredGames = selectedGames.map(game => {
    let score = 0;
    const objective = campaignInfo.objective?.toLowerCase() || ''
    const targetRegion = campaignInfo.region?.toLowerCase() || ''
    const targetAudience = campaignInfo.target?.toLowerCase() || ''

    // Score by objective match
    if (objective.includes('launch') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('launch'))) score += 3
    if (objective.includes('awareness') && 
        game.marketingCapabilities.some(cap => cap.toLowerCase().includes('awareness'))) score += 3

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
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Recommended Games</h2>
      <div className="space-y-6">
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
            <div className="grid grid-cols-1 gap-3">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-start gap-4 p-3 rounded-xl bg-[#f5f5f7] transition-transform hover:-translate-y-0.5"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    draggable="false"
                  />
                  <div className="flex-grow min-w-0 py-1">
                    <h3 className="text-[#1d1d1f] font-medium text-lg mb-1">
                      {game.name}
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-[#86868b] text-sm truncate">
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
      </div>
    </div>
  )
}

export default GameRecommendations

