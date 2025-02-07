"use client";

import { Card } from "@/components/ui/card";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";

export function CampaignStrategy() {
  const { campaignDetails } = useMarketingCampaign();
  const analysis = campaignDetails.recommendations?.analysis;

  return (
    <Card className="bg-white shadow p-6">
      <h2 className="text-xl font-bold mb-4">Campaign Strategy</h2>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Objective</h3>
          <p className="mt-1">{campaignDetails.objective}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Target Audience</h3>
          <p className="mt-1">{campaignDetails.target}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Region</h3>
          <p className="mt-1">{campaignDetails.region}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Recommended Strategy
          </h3>
          {analysis?.marketStrategy.reasoning && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600">Analysis:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {analysis.marketStrategy.reasoning.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis?.marketStrategy.strategies && (
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Recommendations:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.marketStrategy.strategies.map((strategy, i) => (
                  <li key={i}>{strategy}</li>
                ))}
              </ul>
            </div>
          )}

          {!analysis && (
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Focus on games with virtual event capabilities for product
                showcases
              </li>
              <li>Balance of casual and core gaming experiences</li>
              <li>Emphasis on mobile-first games popular in Asian markets</li>
            </ul>
          )}
        </div>

        {analysis?.gameSelection.reasoning && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Game Selection Strategy
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {analysis.gameSelection.reasoning.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
