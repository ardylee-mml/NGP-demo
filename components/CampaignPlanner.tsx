"use client"

import { useState } from 'react';
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import CampaignSummary from './CampaignSummary';
import KOLRecommendations from './KOLRecommendations';
import GameRecommendations from './GameRecommendations';
import { Chatbot } from './Chatbot';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const CampaignPlanner = () => {
  const { isComplete, setIsComplete, setCampaignDetails } = useMarketingCampaign();
  const [step, setStep] = useState(1);
  const [campaignInfo, setCampaignInfo] = useState({
    objective: '',
    target: '',
    region: '',
  });

  const handleInfoSubmit = (info: any) => {
    const formattedInfo = {
      objective: info.objective,
      targetAudience: info.target,
      targetRegion: info.region,
    };
    setCampaignInfo(info);
    setCampaignDetails(formattedInfo);
    setIsComplete(true);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setIsComplete(false);
    setCampaignDetails({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {step === 1 ? (
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Let's Plan Your Campaign</h2>
          <Chatbot onComplete={handleInfoSubmit} />
        </div>
      ) : (
        <div className="py-8 space-y-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Chat
            </Button>
            <h2 className="text-2xl font-bold">Campaign Plan</h2>
          </div>
          <CampaignSummary info={campaignInfo} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GameRecommendations campaignInfo={campaignInfo} />
            <KOLRecommendations campaignInfo={campaignInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPlanner; 