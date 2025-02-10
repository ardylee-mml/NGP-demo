"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const CampaignSummary = ({ info }: { info: any }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAnalysis = async () => {
      setIsLoading(true);
      try {
        const result = await analyzeCampaignDetails();
        setAnalysis(result);
      } catch (error) {
        console.error("Error getting analysis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (info.objective) {
      getAnalysis();
    }
  }, [info]);

  const analyzeCampaignDetails = async () => {
    const response = await fetch("/api/deepseek", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Analyze this campaign for Roblox implementation and provide specific insights:
Objective: ${info.objective}
Target Audience: ${info.target}
Region: ${info.region}

Return a JSON object with these fields:
- gameTypeRecommendation: Suggest 1-2 Roblox game genres/types that would best fit this campaign
- gameplayElements: List 2-3 specific gameplay mechanics or features to implement (e.g. collectibles, mini-games, social features)
- engagementMechanics: Recommend 2-3 Roblox-specific ways to drive user engagement (e.g. special items, limited time events)
- platformConsiderations: Brief note on any region-specific or audience-specific Roblox platform considerations

Keep each analysis point under 150 characters and focus on actionable Roblox implementation details.`,
      }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Campaign Strategy</h2>
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Objective</h3>
                <p className="mt-1 text-gray-600">{info.objective}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Target Audience</h3>
                <p className="mt-1 text-gray-600">{info.target}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Region</h3>
                <p className="mt-1 text-gray-600">{info.region}</p>
              </div>
            </div>

            {analysis && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">
                  Roblox Campaign Strategy
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Recommended Game Types:</strong>{" "}
                    {analysis.gameTypeRecommendation}
                  </p>
                  <p>
                    <strong>Gameplay Elements:</strong>{" "}
                    {analysis.gameplayElements}
                  </p>
                  <p>
                    <strong>Engagement Mechanics:</strong>{" "}
                    {analysis.engagementMechanics}
                  </p>
                  <p>
                    <strong>Platform Considerations:</strong>{" "}
                    {analysis.platformConsiderations}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignSummary;
