"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NPCCustomizer } from "./NPCCustomizer";
import { useState } from "react";
import { CustomizationItem } from "@/lib/customizationDatabase";

interface KOLCustomizations {
  [kolId: string]: {
    clothes: CustomizationItem | null;
    shoes: CustomizationItem | null;
    items: CustomizationItem | null;
    animations: CustomizationItem | null;
  };
}

export default function KOLRecommendations({
  campaignInfo,
}: {
  campaignInfo: any;
}) {
  const [selectedKOL, setSelectedKOL] = useState<any>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedKOLs, setSelectedKOLs] = useState<string[]>([]);
  const [kolCustomizations, setKolCustomizations] = useState<KOLCustomizations>(
    {}
  );

  const kols = campaignInfo?.recommendations?.recommendedKOLs;
  if (!kols?.length) return null;

  const handleKOLSelect = (kolId: string) => {
    setSelectedKOLs((prev) =>
      prev.includes(kolId)
        ? prev.filter((id) => id !== kolId)
        : [...prev, kolId]
    );
  };

  const handleSaveCustomization = (
    kolId: string,
    customizations: Record<string, CustomizationItem | null>
  ) => {
    setKolCustomizations((prev) => ({
      ...prev,
      [kolId]: {
        clothes: customizations.clothes || null,
        shoes: customizations.shoes || null,
        items: customizations.items || null,
        animations: customizations.animations || null,
      },
    }));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recommended KOLs</CardTitle>
          <div className="text-sm text-muted-foreground">
            {selectedKOLs.length} of {kols.length} selected
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {kols.map((kol: any) => (
            <div
              key={kol.id}
              className={`flex gap-4 p-4 rounded-lg transition-colors ${
                selectedKOLs.includes(kol.id)
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50"
              }`}
            >
              {/* Checkbox Column */}
              <div className="flex items-start pt-1">
                <Checkbox
                  checked={selectedKOLs.includes(kol.id)}
                  onCheckedChange={() => handleKOLSelect(kol.id)}
                />
              </div>

              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={kol.image || "/placeholder-kol.jpg"}
                  alt={kol.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{kol.name}</h3>
                    {kolCustomizations[kol.id] && (
                      <div className="text-xs text-gray-500 mt-1">
                        Customized with{" "}
                        {
                          Object.values(kolCustomizations[kol.id]).filter(
                            Boolean
                          ).length
                        }{" "}
                        items
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!selectedKOLs.includes(kol.id)}
                    onClick={() => {
                      setSelectedKOL(kol);
                      setIsCustomizerOpen(true);
                    }}
                  >
                    {kolCustomizations[kol.id]
                      ? "Edit Customization"
                      : "Customize"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">{kol.characterType}</p>

                {/* Personality Traits */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {kol.personality.map((trait: string) => (
                    <span
                      key={trait}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Regions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {kol.regions.map((region: string) => (
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
                  {kol.marketingCapabilities.map((capability: string) => (
                    <span
                      key={capability}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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

      <NPCCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        npc={selectedKOL}
        initialCustomizations={
          selectedKOL ? kolCustomizations[selectedKOL.id] : undefined
        }
        onSave={(customizations) => {
          if (selectedKOL) {
            handleSaveCustomization(selectedKOL.id, customizations);
            setIsCustomizerOpen(false);
          }
        }}
      />
    </>
  );
}
