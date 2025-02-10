"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Game } from "@/lib/gameDatabase";
import { KOL } from "@/lib/kolDatabase";

interface CampaignDetails {
  objective: string;
  target: string;
  region: string;
  recommendations?: {
    strategy: string;
    games: Game[];
    kols: KOL[];
    analysis: {
      marketStrategy: {
        reasoning: string[];
        strategies: string[];
      };
      gameSelection: {
        reasoning: string[];
        selectedGames: Game[];
        matchCriteria: any[];
      };
      kolSelection: {
        reasoning: string[];
        selectedKOLs: KOL[];
        matchCriteria: any[];
      };
    };
  };
}

interface MarketingCampaignContextType {
  campaignDetails: any;
  isComplete: boolean;
  setCampaignDetails: (details: any) => void;
  setIsComplete: (complete: boolean) => void;
}

const MarketingCampaignContext = createContext<MarketingCampaignContextType>({
  campaignDetails: null,
  isComplete: false,
  setCampaignDetails: () => {},
  setIsComplete: () => {},
});

export function MarketingCampaignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize state from localStorage if available
  const [campaignDetails, setCampaignDetails] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("campaignDetails");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [isComplete, setIsComplete] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isComplete") === "true";
    }
    return false;
  });

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
      }}
    >
      {children}
    </MarketingCampaignContext.Provider>
  );
}

export function useMarketingCampaign() {
  const context = useContext(MarketingCampaignContext);
  if (!context) {
    throw new Error(
      "useMarketingCampaign must be used within a MarketingCampaignProvider"
    );
  }
  return context;
}
