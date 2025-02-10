"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KOLRecommendations({
  campaignInfo,
}: {
  campaignInfo: any;
}) {
  console.log("KOLRecommendations received:", campaignInfo);

  // Access recommendedKOLs directly from recommendations
  const kols = campaignInfo?.recommendations?.recommendedKOLs;
  if (!kols?.length) {
    console.log("No KOL recommendations found");
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended KOLs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {kols.map((kol: any) => (
          <div key={kol.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={kol.image || "/placeholder-kol.jpg"}
                alt={kol.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{kol.name}</h3>
              <p className="text-sm text-gray-600">{kol.characterType}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {kol.categories.map((category: string) => (
                  <span
                    key={category}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                  >
                    {category}
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
