"use client";

import { useState } from "react";
import { Chatbot } from "./Chatbot";
import { CampaignStrategy } from "./CampaignStrategy";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import CampaignSummary from "./CampaignSummary";
import KOLRecommendations from "./KOLRecommendations";
import GameRecommendations from "./GameRecommendations";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export function CampaignPlanner() {
  const { isComplete, setIsComplete, setCampaignDetails } =
    useMarketingCampaign();
  const [step, setStep] = useState(1);
  const [campaignInfo, setCampaignInfo] = useState({
    objective: "",
    target: "",
    region: "",
  });

  const handleInfoSubmit = (info: any) => {
    const formattedInfo = {
      objective: info.objective,
      target: info.target,
      region: info.region,
    };
    setCampaignInfo(info);
    setCampaignDetails(formattedInfo);
    setIsComplete(true);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setIsComplete(false);
    setCampaignDetails({
      objective: "",
      target: "",
      region: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {!isComplete ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Let's Plan Your Campaign
            </h2>
            <Chatbot />
          </div>
        ) : (
          <CampaignStrategy />
        )}
      </div>
    </div>
  );
}
