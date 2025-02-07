"use client";

import { Back } from "@/components/Back";
import { CampaignStrategy } from "@/components/CampaignStrategy";
import { GameRecommendations } from "@/components/GameRecommendations";
import { KOLRecommendations } from "@/components/KOLRecommendations";
import { DebugPanel } from "@/components/DebugPanel";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";

export default function CampaignPlan() {
  const { campaignDetails } = useMarketingCampaign();

  return (
    <div className="min-h-screen bg-[#F5F7F9] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Back href="/chat" />
          <h1 className="text-2xl font-bold text-[#213A58]">Campaign Plan</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CampaignStrategy />
            <GameRecommendations />
          </div>
          <KOLRecommendations campaignInfo={campaignDetails} />
        </div>

        {/* Add debug panel here */}
        {campaignDetails.recommendations?.analysis && (
          <DebugPanel
            info={{
              campaignInfo: {
                objective: campaignDetails.objective,
                target: campaignDetails.target,
                region: campaignDetails.region,
              },
              analysis: campaignDetails.recommendations.analysis,
            }}
          />
        )}
      </div>
    </div>
  );
}
