"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CampaignStrategy } from "@/components/CampaignStrategy";
import GameRecommendations from "@/components/GameRecommendations";
import KOLRecommendations from "@/components/KOLRecommendations";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";

export default function CampaignPlan() {
  const router = useRouter();
  const { campaignDetails, isComplete } = useMarketingCampaign();

  // Redirect if no campaign details
  useEffect(() => {
    if (!isComplete || !campaignDetails?.recommendations) {
      router.push("/");
    }
  }, [isComplete, campaignDetails, router]);

  if (!campaignDetails?.recommendations) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Campaign Strategy at the top - full width */}
        <div className="w-full">
          <CampaignStrategy campaignInfo={campaignDetails} />
        </div>

        {/* Game and KOL Recommendations side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Game Recommendations on the left */}
          <div>
            {campaignDetails.recommendations.recommendedGames?.length > 0 && (
              <GameRecommendations campaignInfo={campaignDetails} />
            )}
          </div>

          {/* KOL Recommendations on the right */}
          <div>
            {campaignDetails.recommendations.recommendedKOLs?.length > 0 && (
              <KOLRecommendations campaignInfo={campaignDetails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
