"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import CampaignSummary from "./CampaignSummary";
import GameRecommendations from "./GameRecommendations";
import KOLRecommendations from "./KOLRecommendations";
import {
  ArrowLeft,
  Target,
  Users,
  Globe,
  TrendingUp,
  MessageCircle,
  Lightbulb,
  Flag,
} from "lucide-react";
import { useState } from "react";

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
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b border-blue-100">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-full">
            <Flag className="h-5 w-5 text-blue-600 animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Campaign Strategy
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Campaign Objective</h3>
            </div>
            <p className="text-sm text-blue-700">{analysis.objective}</p>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-indigo-800 mb-2">
              <div className="p-2 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Target Audience</h3>
            </div>
            <p className="text-sm text-indigo-700">{analysis.targetAudience}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-purple-800 mb-2">
              <div className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <Globe className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Regional Focus</h3>
            </div>
            <p className="text-sm text-purple-700">{analysis.regionalFocus}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-cyan-800 mb-2">
              <div className="p-2 bg-cyan-100 rounded-full group-hover:bg-cyan-200 transition-colors">
                <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Success Metrics</h3>
            </div>
            <p className="text-sm text-cyan-700">{analysis.successMetrics}</p>
          </div>

          <div className="p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <div className="p-2 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Key Messages</h3>
            </div>
            <p className="text-sm text-teal-700">{analysis.keyMessages}</p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200 group">
            <div className="flex items-center gap-2 text-emerald-800 mb-2">
              <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Lightbulb className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-medium">Campaign Approach</h3>
            </div>
            <p className="text-sm text-emerald-700">{analysis.approach}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
