"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CampaignStrategy } from "@/components/CampaignStrategy";
import GameRecommendations from "@/components/GameRecommendations";
import KOLRecommendations from "@/components/KOLRecommendations";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameplayRecommendations from "@/components/GameplayRecommendations";

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
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Chat
            </Button>
          </Link>
        </div>

        {/* Campaign Strategy at the top - full width */}
        <div className="w-full">
          <CampaignStrategy campaignInfo={campaignDetails} />
        </div>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-[1000px] grid-cols-3 p-1 mx-auto">
            <TabsTrigger
              value="games"
              className="px-12 py-4 text-lg font-medium whitespace-nowrap transition-all data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-sm hover:bg-gray-50"
            >
              Recommended Games
            </TabsTrigger>
            <TabsTrigger
              value="kols"
              className="px-12 py-4 text-lg font-medium whitespace-nowrap transition-all data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-sm hover:bg-gray-50"
            >
              Recommended KOLs
            </TabsTrigger>
            <TabsTrigger
              value="minigames"
              className="px-12 py-4 text-lg font-medium whitespace-nowrap transition-all data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 data-[state=active]:shadow-sm hover:bg-gray-50"
            >
              Recommended Mini-Games
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="games"
            className="transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
          >
            <GameRecommendations campaignInfo={campaignDetails} />
          </TabsContent>

          <TabsContent
            value="kols"
            className="transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
          >
            <KOLRecommendations campaignInfo={campaignDetails} />
          </TabsContent>

          <TabsContent
            value="minigames"
            className="transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
          >
            <GameplayRecommendations campaignInfo={campaignDetails} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
