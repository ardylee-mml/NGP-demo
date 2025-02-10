"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GameRecommendations({
  campaignInfo,
}: {
  campaignInfo: any;
}) {
  console.log("GameRecommendations received:", campaignInfo);

  // Access recommendedGames directly from recommendations
  const games = campaignInfo?.recommendations?.recommendedGames;
  if (!games?.length) {
    console.log("No game recommendations found");
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Games</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {games.map((game: any) => (
          <div key={game.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={game.image || "/placeholder-game.jpg"}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{game.name}</h3>
              <p className="text-sm text-gray-600">{game.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.marketingCapabilities.map((capability: string) => (
                  <span
                    key={capability}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
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
