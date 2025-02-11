"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GameplayCustomizer } from "./GameplayCustomizer";
import { useState } from "react";
import { GameplayElement } from "@/lib/gameplayDatabase";
import { Badge } from "@/components/ui/badge";

export default function GameplayRecommendations({
  campaignInfo,
}: {
  campaignInfo: any;
}) {
  const [selectedGame, setSelectedGame] = useState<GameplayElement | null>(
    null
  );
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [gameCustomizations, setGameCustomizations] = useState<
    Record<string, Record<string, string>>
  >({});

  const games = campaignInfo?.recommendations?.recommendedMinigames;
  if (!games?.length) return null;

  const handleGameSelect = (gameId: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleSaveCustomization = (
    gameId: string,
    customizations: Record<string, string>
  ) => {
    setGameCustomizations((prev) => ({
      ...prev,
      [gameId]: customizations,
    }));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recommended Mini-games</CardTitle>
          <div className="text-sm text-muted-foreground">
            {selectedGames.length} of {games.length} selected
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {games.map((game: GameplayElement) => (
            <div
              key={game.id}
              className={`flex gap-4 p-4 rounded-lg transition-colors ${
                selectedGames.includes(game.id)
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start pt-1">
                <Checkbox
                  checked={selectedGames.includes(game.id)}
                  onCheckedChange={() => handleGameSelect(game.id)}
                />
              </div>

              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{game.name}</h3>
                    {gameCustomizations[game.id] && (
                      <div className="text-xs text-gray-500 mt-1">
                        Customized with{" "}
                        {Object.keys(gameCustomizations[game.id]).length}{" "}
                        elements
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!selectedGames.includes(game.id)}
                    onClick={() => {
                      setSelectedGame(game);
                      setIsCustomizerOpen(true);
                    }}
                  >
                    {gameCustomizations[game.id]
                      ? "Edit Customization"
                      : "Customize"}
                  </Button>
                </div>

                <p className="text-sm text-gray-600">{game.description}</p>

                {/* Difficulty */}
                <div className="mt-2">
                  <Badge variant="secondary">{game.difficulty}</Badge>
                </div>

                {/* Marketing Capabilities */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {game.marketingCapabilities.map((capability) => (
                    <span
                      key={capability}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {capability}
                    </span>
                  ))}
                </div>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                {/* Engagement Metrics */}
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>🕒 {game.engagementMetrics.averagePlayTime}</span>
                  <span>✓ {game.engagementMetrics.completionRate}</span>
                  <span>🔄 {game.engagementMetrics.replayRate}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedGame && (
        <GameplayCustomizer
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          game={selectedGame}
          initialCustomizations={
            selectedGame ? gameCustomizations[selectedGame.id] : undefined
          }
          onSave={(customizations) => {
            if (selectedGame) {
              handleSaveCustomization(selectedGame.id, customizations);
              setIsCustomizerOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
