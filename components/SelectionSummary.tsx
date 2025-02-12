import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Game } from "@/lib/gameDatabase";
import { KOL } from "@/lib/kolDatabase";
import { GameplayElement } from "@/lib/gameplayDatabase";
import { Gamepad2, Users, Puzzle, ArrowRight } from "lucide-react";

interface SelectionSummaryProps {
  selectedGames: string[];
  selectedKols: string[];
  selectedMiniGames: string[];
  campaignInfo: any;
}

export function SelectionSummary({
  selectedGames,
  selectedKols,
  selectedMiniGames,
  campaignInfo,
}: SelectionSummaryProps) {
  const recommendations = campaignInfo?.recommendations || {
    recommendedGames: [],
    recommendedKOLs: [],
    recommendedMinigames: [],
  };

  return (
    <Card className="mt-8 border-2 border-blue-100 bg-blue-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Campaign Selection Summary</span>
          <Button
            onClick={() => console.log("Sending selections to games...")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm and Send to Games
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Gamepad2 className="h-5 w-5" />
            <h3 className="font-medium">Games ({selectedGames.length})</h3>
          </div>
          <div className="space-y-2">
            {selectedGames.map((id) => {
              const game = recommendations.recommendedGames?.find(
                (g: Game) => g.id === id
              ) || { name: "Unknown Game", image: "/placeholder-game.jpg" };
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
                >
                  <img
                    src={game.image || "/placeholder-game.jpg"}
                    alt={game.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-sm">{game.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Users className="h-5 w-5" />
            <h3 className="font-medium">KOLs ({selectedKols.length})</h3>
          </div>
          <div className="space-y-2">
            {selectedKols.map((id) => {
              const kol = recommendations.recommendedKOLs?.find(
                (k: KOL) => k.id === id
              ) || { name: "Unknown KOL", image: "/placeholder-kol.jpg" };
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
                >
                  <img
                    src={kol.image || "/placeholder-kol.jpg"}
                    alt={kol.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{kol.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Puzzle className="h-5 w-5" />
            <h3 className="font-medium">
              Mini-Games ({selectedMiniGames.length})
            </h3>
          </div>
          <div className="space-y-2">
            {selectedMiniGames.map((id) => {
              const game = recommendations.recommendedMinigames?.find(
                (g: GameplayElement) => g.id === id
              ) || {
                name: "Unknown Mini-Game",
                image: "/placeholder-minigame.jpg",
              };
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
                >
                  <img
                    src={game.image || "/placeholder-minigame.jpg"}
                    alt={game.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-sm">{game.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
