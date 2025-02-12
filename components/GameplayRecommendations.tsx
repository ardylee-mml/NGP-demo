"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GameplayCustomizer } from "./GameplayCustomizer";
import { useState } from "react";
import { GameplayElement } from "@/lib/gameplayDatabase";
import { Badge } from "@/components/ui/badge";

interface GameplayRecommendationsProps {
  minigames: GameplayElement[];
  selectedMinigames: string[];
  onMinigameSelect: (minigameId: string) => void;
}

export default function GameplayRecommendations({
  minigames = [],
  selectedMinigames = [],
  onMinigameSelect,
}: GameplayRecommendationsProps) {
  const [selectedMinigame, setSelectedMinigame] =
    useState<GameplayElement | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [gameCustomizations, setGameCustomizations] = useState<
    Record<string, Record<string, string>>
  >({});

  if (!minigames || !selectedMinigames) return null;

  const selectedMinigameDetails = minigames.filter((game: GameplayElement) =>
    selectedMinigames.includes(game.id)
  );
  const averageEngagement =
    selectedMinigameDetails.length > 0
      ? (
          selectedMinigameDetails.reduce(
            (sum: number, game: GameplayElement) =>
              sum + parseInt(game.engagementMetrics.completionRate),
            0
          ) / selectedMinigameDetails.length
        ).toFixed(1)
      : 0;

  const handleCustomize = (minigame: GameplayElement) => {
    setSelectedMinigame(minigame);
    setIsCustomizerOpen(true);
  };

  const handleSaveCustomization = (customizations: Record<string, string>) => {
    if (selectedMinigame) {
      setGameCustomizations((prev) => ({
        ...prev,
        [selectedMinigame.id]: customizations,
      }));
      setIsCustomizerOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Selected {selectedMinigames.length} of {minigames.length} Mini-Games
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {minigames.map((minigame) => (
            <div
              key={minigame.id}
              className={`flex gap-4 p-4 rounded-lg transition-colors ${
                selectedMinigames.includes(minigame.id)
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start pt-1">
                <Checkbox
                  checked={selectedMinigames.includes(minigame.id)}
                  onCheckedChange={() => onMinigameSelect(minigame.id)}
                />
              </div>

              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={minigame.image || "/placeholder-minigame.jpg"}
                  alt={minigame.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{minigame.name}</h3>
                    {gameCustomizations[minigame.id] && (
                      <div className="text-xs text-gray-500 mt-1">
                        Customized with{" "}
                        {Object.keys(gameCustomizations[minigame.id]).length}{" "}
                        elements
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!selectedMinigames.includes(minigame.id)}
                    onClick={() => handleCustomize(minigame)}
                  >
                    {gameCustomizations[minigame.id]
                      ? "Edit Customization"
                      : "Customize"}
                  </Button>
                </div>

                <p className="text-sm text-gray-600">{minigame.description}</p>

                {/* Difficulty */}
                <div className="mt-2">
                  <Badge variant="secondary">{minigame.difficulty}</Badge>
                </div>

                {/* Marketing Capabilities */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {minigame.marketingCapabilities.map((capability) => (
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
                  {minigame.platforms.map((platform) => (
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
                  <span>🕒 {minigame.engagementMetrics.averagePlayTime}</span>
                  <span>✓ {minigame.engagementMetrics.completionRate}</span>
                  <span>🔄 {minigame.engagementMetrics.replayRate}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedMinigame && (
        <GameplayCustomizer
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          minigame={selectedMinigame}
          initialCustomizations={gameCustomizations[selectedMinigame.id]}
          onSave={handleSaveCustomization}
        />
      )}
    </div>
  );
}
