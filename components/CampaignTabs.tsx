import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignStrategy } from "./CampaignStrategy";
import CampaignSummary from "./CampaignSummary";
import GameRecommendations from "./GameRecommendations";
import KOLRecommendations from "./KOLRecommendations";
import GameplayRecommendations from "./GameplayRecommendations";
import { useState } from "react";

export function CampaignTabs({ campaignInfo }: { campaignInfo: any }) {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedKols, setSelectedKols] = useState<string[]>([]);
  const [selectedMinigames, setSelectedMinigames] = useState<string[]>([]);

  const handleGameSelect = (gameId: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleKolSelect = (kolId: string) => {
    setSelectedKols((prev) =>
      prev.includes(kolId)
        ? prev.filter((id) => id !== kolId)
        : [...prev, kolId]
    );
  };

  const handleMinigameSelect = (minigameId: string) => {
    setSelectedMinigames((prev) =>
      prev.includes(minigameId)
        ? prev.filter((id) => id !== minigameId)
        : [...prev, minigameId]
    );
  };

  return (
    <Tabs defaultValue="strategy" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="strategy">Strategy</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="games">Games</TabsTrigger>
        <TabsTrigger value="kols">KOLs</TabsTrigger>
        <TabsTrigger value="minigames">Mini-Games</TabsTrigger>
      </TabsList>

      <TabsContent value="strategy">
        <CampaignStrategy campaignInfo={campaignInfo} />
      </TabsContent>

      <TabsContent value="summary">
        <CampaignSummary
          selectedGames={selectedGames}
          selectedKols={selectedKols}
          selectedMiniGames={selectedMinigames}
          campaignInfo={campaignInfo}
        />
      </TabsContent>

      <TabsContent value="games">
        <GameRecommendations
          games={campaignInfo?.recommendations?.recommendedGames || []}
          selectedGames={selectedGames}
          onGameSelect={handleGameSelect}
        />
      </TabsContent>

      <TabsContent value="kols">
        <KOLRecommendations
          kols={campaignInfo?.recommendations?.recommendedKOLs || []}
          selectedKols={selectedKols}
          onKolSelect={handleKolSelect}
        />
      </TabsContent>

      <TabsContent value="minigames">
        <GameplayRecommendations
          minigames={campaignInfo?.recommendations?.recommendedMinigames || []}
          selectedMinigames={selectedMinigames}
          onMinigameSelect={handleMinigameSelect}
        />
      </TabsContent>
    </Tabs>
  );
}
