"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import CampaignSummary from "./CampaignSummary";
import GameRecommendations from "./GameRecommendations";
import KOLRecommendations from "./KOLRecommendations";
import { ArrowLeft } from "lucide-react";

function generateRecommendations(details: {
  objective: string;
  target: string;
  region: string;
}) {
  // Analyze campaign details to generate recommendations
  const recommendations = [];

  // Game type recommendations based on objective
  if (details.objective.toLowerCase().includes("brand awareness")) {
    recommendations.push(
      "Prioritize high-traffic casual games with broad appeal for maximum visibility"
    );
    recommendations.push(
      "Integrate branded virtual billboards and in-game advertising spaces"
    );
  } else if (details.objective.toLowerCase().includes("product launch")) {
    recommendations.push(
      "Focus on games with interactive virtual showrooms and product demonstration capabilities"
    );
    recommendations.push(
      "Utilize games with social features for product sharing and viral marketing"
    );
  }

  // Audience-specific recommendations
  if (details.target.toLowerCase().includes("young")) {
    recommendations.push(
      "Target mobile action and battle royale games with high Gen-Z engagement"
    );
    recommendations.push(
      "Incorporate trending gaming influencers and esports personalities"
    );
  } else if (details.target.toLowerCase().includes("professional")) {
    recommendations.push(
      "Focus on strategic and simulation games with sophisticated gameplay"
    );
    recommendations.push(
      "Partner with business-oriented gaming content creators"
    );
  }

  // Region-specific recommendations
  if (details.region.toLowerCase().includes("asia")) {
    recommendations.push(
      "Prioritize mobile MOBA and RPG games popular in Asian markets"
    );
    recommendations.push(
      "Collaborate with regional gaming KOLs and livestreamers"
    );
  } else if (details.region.toLowerCase().includes("west")) {
    recommendations.push("Focus on console and PC gaming platforms");
    recommendations.push(
      "Leverage mainstream gaming influencers and YouTube creators"
    );
  }

  return recommendations;
}

export function CampaignStrategy({ campaignInfo }: { campaignInfo: any }) {
  if (!campaignInfo?.recommendations?.analysis) return null;

  const { analysis } = campaignInfo.recommendations;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Strategy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Game Strategy</h3>
            <p className="text-sm text-blue-700">{analysis.gameStrategy}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Audience Match</h3>
            <p className="text-sm text-green-700">{analysis.audienceMatch}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Regional Focus</h3>
            <p className="text-sm text-purple-700">{analysis.regionalFocus}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
