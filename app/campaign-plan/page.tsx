"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CampaignStrategy } from "@/components/CampaignStrategy";
import GameRecommendations from "@/components/GameRecommendations";
import KOLRecommendations from "@/components/KOLRecommendations";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Gamepad2, Users, Puzzle, Box } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameplayRecommendations from "@/components/GameplayRecommendations";
import { useSelections } from "@/hooks/useSelections";
import { SelectionSummary } from "@/components/SelectionSummary";
import { ImageConverterDialog } from "@/components/ui/image-converter-dialog";

export default function CampaignPlan() {
  const router = useRouter();
  const { campaignDetails, isComplete } = useMarketingCampaign();

  const [selectedGames, setSelectedGames] = useSelections("selectedGames");
  const [selectedKols, setSelectedKols] = useSelections("selectedKols");
  const [selectedMiniGames, setSelectedMiniGames] =
    useSelections("selectedMiniGames");
  const [isConverterOpen, setIsConverterOpen] = useState(false);

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
        {/* Navigation */}
        <div className="mb-6 grid grid-cols-3">
          <div>
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

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsConverterOpen(true)}
            >
              <Box className="h-4 w-4" />
              Convert 2D image to 3D game object
            </Button>
          </div>
        </div>

        {/* Campaign Strategy */}
        <CampaignStrategy campaignInfo={campaignDetails} />

        {/* Recommendations Tabs */}
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Recommended Games
            </TabsTrigger>
            <TabsTrigger value="kols" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recommended KOLs
            </TabsTrigger>
            <TabsTrigger value="minigames" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              Mini-Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <GameRecommendations
              games={campaignDetails.recommendations.recommendedGames || []}
              selectedGames={selectedGames}
              onGameSelect={(id) =>
                setSelectedGames((prev) =>
                  prev.includes(id)
                    ? prev.filter((x) => x !== id)
                    : [...prev, id]
                )
              }
            />
          </TabsContent>

          <TabsContent value="kols">
            <KOLRecommendations
              kols={campaignDetails.recommendations.recommendedKOLs || []}
              selectedKols={selectedKols}
              onKolSelect={(id) =>
                setSelectedKols((prev) =>
                  prev.includes(id)
                    ? prev.filter((x) => x !== id)
                    : [...prev, id]
                )
              }
            />
          </TabsContent>

          <TabsContent value="minigames">
            <GameplayRecommendations
              minigames={
                campaignDetails.recommendations.recommendedMinigames || []
              }
              selectedMinigames={selectedMiniGames}
              onMinigameSelect={(id) =>
                setSelectedMiniGames((prev) =>
                  prev.includes(id)
                    ? prev.filter((x) => x !== id)
                    : [...prev, id]
                )
              }
            />
          </TabsContent>
        </Tabs>

        {/* Selection Summary */}
        <SelectionSummary
          selectedGames={selectedGames}
          selectedKols={selectedKols}
          selectedMiniGames={selectedMiniGames}
          campaignInfo={campaignDetails}
        />

        <ImageConverterDialog
          isOpen={isConverterOpen}
          onClose={() => setIsConverterOpen(false)}
        />
      </div>
    </div>
  );
}
