"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NPCCustomizer } from "./NPCCustomizer";
import { useState } from "react";
import { CustomizationItem } from "@/lib/customizationDatabase";
import { useSelections } from "@/hooks/useSelections";
import { KOL } from "@/lib/kolDatabase";

interface KOLCustomizations {
  [kolId: string]: {
    clothes: CustomizationItem | null;
    shoes: CustomizationItem | null;
    items: CustomizationItem | null;
    animations: CustomizationItem | null;
  };
}

interface KOLRecommendationsProps {
  kols: KOL[];
  selectedKols: string[];
  onKolSelect: (kolId: string) => void;
}

export default function KOLRecommendations({
  kols = [],
  selectedKols = [],
  onKolSelect,
}: KOLRecommendationsProps) {
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [kolCustomizations, setKolCustomizations] = useState<KOLCustomizations>(
    {}
  );

  if (!kols || !selectedKols) return null;

  const handleSaveCustomization = (
    kolId: string,
    customizations: {
      clothes: CustomizationItem | null;
      shoes: CustomizationItem | null;
      items: CustomizationItem | null;
      animations: CustomizationItem | null;
    }
  ) => {
    setKolCustomizations((prev) => ({
      ...prev,
      [kolId]: customizations,
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Selected {selectedKols.length} of {kols.length} KOLs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {kols.map((kol: KOL) => (
          <div
            key={kol.id}
            className={`flex gap-4 p-4 rounded-lg transition-colors ${
              selectedKols.includes(kol.id)
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-start pt-1">
              <Checkbox
                checked={selectedKols.includes(kol.id)}
                onCheckedChange={() => onKolSelect(kol.id)}
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
                        Object.values(kolCustomizations[kol.id]).filter(Boolean)
                          .length
                      }{" "}
                      items
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!selectedKols.includes(kol.id)}
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
    </Card>
  );
}
