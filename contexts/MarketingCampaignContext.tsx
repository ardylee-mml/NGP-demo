"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Game } from "@/lib/gameDatabase";
import { KOL } from "@/lib/kolDatabase";
import { GameplayElement } from "@/lib/gameplayDatabase";
import { RecommendationService } from "@/lib/recommendationService";

interface CampaignDetails {
  objective: string;
  target: string;
  region: string[];
  recommendations?: {
    analysis: {
      objective: string;
      targetAudience: string;
      regionalFocus: string;
      successMetrics: string;
      keyMessages: string;
      approach: string;
    };
    recommendedGames: Game[];
    recommendedKOLs: KOL[];
    recommendedMinigames: GameplayElement[];
  };
}

interface MarketingCampaignContextType {
  campaignDetails: any;
  isComplete: boolean;
  setCampaignDetails: (details: any) => void;
  setIsComplete: (complete: boolean) => void;
  generateRecommendations: (
    objective: string,
    target: string,
    region: string[]
  ) => Promise<void>;
  setCampaignInfo: (info: any) => void;
}

const MarketingCampaignContext = createContext<
  MarketingCampaignContextType | undefined
>(undefined);

export function MarketingCampaignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const recommendationService = new RecommendationService();

  const generateRecommendations = async (
    objective: string,
    target: string,
    region: string[]
  ) => {
    try {
      const recommendations = {
        analysis: {
          objective: objective,
          targetAudience: target,
          regionalFocus: region.join(" and "),
          successMetrics:
            "Track engagement rates, user retention, and brand visibility",
          keyMessages: "Emphasize brand values and unique selling points",
          approach:
            "Integrate seamlessly with gaming experiences while maintaining brand authenticity",
        },
        recommendedGames: recommendationService.getGames(),
        recommendedKOLs: recommendationService.getKOLs(),
        recommendedMinigames: [],
      };

      setCampaignDetails({
        objective,
        target,
        region,
        recommendations,
      });

      setIsComplete(true);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    }
  };

  const setCampaignInfo = (info: any) => {
    // Format the campaign analysis
    const recommendations = {
      analysis: {
        objective: info.objective,
        targetAudience: info.target,
        regionalFocus: info.region,
        successMetrics:
          "Track engagement rates, user retention, and brand visibility",
        keyMessages: "Emphasize brand values and unique selling points",
        approach:
          "Integrate seamlessly with gaming experiences while maintaining brand authenticity",
      },
      recommendedGames: info.recommendations?.recommendedGames || [],
      recommendedKOLs: info.recommendations?.recommendedKOLs || [],
      recommendedMinigames: info.recommendations?.recommendedMinigames || [],
    };

    setCampaignDetails({
      ...info,
      recommendations,
    });
    setIsComplete(true);
  };

  // Save to localStorage when state changes
  useEffect(() => {
    if (campaignDetails) {
      localStorage.setItem("campaignDetails", JSON.stringify(campaignDetails));
    }
  }, [campaignDetails]);

  useEffect(() => {
    localStorage.setItem("isComplete", isComplete.toString());
  }, [isComplete]);

  // Wrapper functions to update both state and localStorage
  const handleSetCampaignDetails = (details: any) => {
    console.log("Setting campaign details:", details);
    setCampaignDetails(details);
  };

  const handleSetIsComplete = (complete: boolean) => {
    console.log("Setting isComplete:", complete);
    setIsComplete(complete);
  };

  console.log("Context - Campaign Details:", campaignDetails);
  console.log("Context - Is Complete:", isComplete);

  return (
    <MarketingCampaignContext.Provider
      value={{
        campaignDetails,
        isComplete,
        setCampaignDetails: handleSetCampaignDetails,
        setIsComplete: handleSetIsComplete,
        generateRecommendations,
        setCampaignInfo,
      }}
    >
      {children}
    </MarketingCampaignContext.Provider>
  );
}

export function useMarketingCampaign() {
  const context = useContext(MarketingCampaignContext);
  if (context === undefined) {
    throw new Error(
      "useMarketingCampaign must be used within a MarketingCampaignProvider"
    );
  }
  return context;
}
