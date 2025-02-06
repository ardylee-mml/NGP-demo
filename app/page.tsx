"use client"

import { useState } from "react"
import { Chatbot } from "@/components/Chatbot"
import { GameRecommendations } from "@/components/GameRecommendations"
import { NPCCustomizer } from "@/components/NPCCustomizer"
import { SuggestedKOLs } from "@/components/SuggestedKOLs"
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext"
import { CampaignSummary } from "@/components/CampaignSummary"
import { 
  Trophy, Users,
  Sparkles, Crown, Star
} from "lucide-react"

interface CustomizationItem {
  id: string
  name: string
  image: string
}

interface SelectedItems {
  clothes: CustomizationItem[]
  shoes: CustomizationItem[]
  items: CustomizationItem[]
  animations: CustomizationItem[]
}

export default function Home() {
  const { isComplete } = useMarketingCampaign()
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    clothes: [],
    shoes: [],
    items: [],
    animations: []
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#80EE98] to-[#09D1C7]">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#46DFB1]">
        <div className="max-w-[1440px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/MML-logo.png" 
                alt="MML Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-semibold text-[#213A58]">
                Marketing Campaign Designer
              </h1>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-sm text-[#0C6478] hover:text-[#15919B] flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Help
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Game Recommendations and KOLs */}
          <div className="col-span-4 space-y-6">
            {isComplete ? (
              <>
                <CampaignSummary />
                <GameRecommendations />
                <SuggestedKOLs />
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="h-8 w-8 text-[#15919B] animate-pulse" />
                  <p className="text-[#0C6478]">
                    Complete the campaign details in the chat to see recommendations
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Center Column - Chatbot and Character Customizer */}
          <div className="col-span-5 space-y-6">
            <div className="sticky top-24 space-y-6">
              <Chatbot className="h-[60vh]" />
              {isComplete && (
                <NPCCustomizer 
                  isSelectionArea={true}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
            </div>
          </div>

          {/* Right Column - Customization Options */}
          <div className="col-span-3">
            {isComplete && (
              <div className="sticky top-24">
                <NPCCustomizer 
                  isSelectionArea={false}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

