"use client";

import { Game } from "@/lib/gameDatabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { GameCard } from "./GameCard";

interface GameRecommendationsProps {
  games: Game[];
  selectedGames: string[];
  onGameSelect: (gameId: string) => void;
}

export default function GameRecommendations({
  games = [],
  selectedGames = [],
  onGameSelect,
}: GameRecommendationsProps) {
  if (!games || !selectedGames) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Selected {selectedGames.length} of {games.length} games
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isSelected={selectedGames.includes(game.id)}
              onSelect={() => onGameSelect(game.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
