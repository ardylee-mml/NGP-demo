"use client";

import { Game } from "@/lib/gameDatabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface GameRecommendationsProps {
  campaignInfo: {
    recommendations: {
      recommendedGames: Game[];
    };
  };
}

export default function GameRecommendations({
  campaignInfo,
}: GameRecommendationsProps) {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const games = campaignInfo?.recommendations?.recommendedGames;
  if (!games?.length) return null;

  const handleGameSelect = (gameId: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended Games</CardTitle>
        <div className="text-sm text-muted-foreground">
          {selectedGames.length} of {games.length} selected
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {games.map((game: any) => (
          <div
            key={game.id}
            className={`flex gap-4 p-4 rounded-lg transition-colors ${
              selectedGames.includes(game.id)
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-50"
            }`}
          >
            {/* Checkbox Column */}
            <div className="flex items-start pt-1">
              <Checkbox
                checked={selectedGames.includes(game.id)}
                onCheckedChange={() => handleGameSelect(game.id)}
              />
            </div>

            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={game.image || "/placeholder-game.jpg"}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{game.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{game.description}</p>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {game.genre.map((g: string) => (
                  <span
                    key={g}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Regions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {game.regions.map((region: string) => (
                  <span
                    key={region}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {region}
                  </span>
                ))}
              </div>

              {/* Marketing Capabilities */}
              <div className="flex flex-wrap gap-2 mt-2">
                {game.marketingCapabilities.map((capability: string) => (
                  <span
                    key={capability}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
