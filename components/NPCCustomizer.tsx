"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KOL } from "@/lib/kolDatabase";
import {
  CustomizationItem,
  customizationItems,
  categories,
} from "@/lib/customizationDatabase";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { UploadDialog } from "@/components/ui/upload-dialog";

interface NPCCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  npc: KOL;
  initialCustomizations?: {
    clothes: CustomizationItem | null;
    shoes: CustomizationItem | null;
    items: CustomizationItem | null;
    animations: CustomizationItem | null;
  };
  onSave: (customizations: Record<string, CustomizationItem | null>) => void;
}

export function NPCCustomizer({
  isOpen,
  onClose,
  npc,
  initialCustomizations,
  onSave,
}: NPCCustomizerProps) {
  const [selectedItems, setSelectedItems] = useState<
    Record<string, CustomizationItem | null>
  >(
    initialCustomizations || {
      clothes: null,
      shoes: null,
      items: null,
      animations: null,
    }
  );

  const [activeTab, setActiveTab] = useState("clothes");
  const [uploadCategory, setUploadCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Add image error handling
  const [imageError, setImageError] = useState(false);

  // Reset error state when NPC changes
  useEffect(() => {
    setImageError(false);
  }, [npc]);

  const handleItemSelect = (item: CustomizationItem) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item, // Toggle selection
    }));
  };

  const handleRemoveItem = (category: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  const isItemSelected = (item: CustomizationItem) => {
    return selectedItems[item.category]?.id === item.id;
  };

  const isItemCompatible = (item: CustomizationItem) => {
    return true; // Make all items selectable
  };

  const handleUpload = (data: {
    name: string;
    description: string;
    file: File | null;
  }) => {
    console.log("Uploading new item:", {
      category: uploadCategory,
      ...data,
    });
    // Mock implementation - would typically call an API here
  };

  if (!npc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Customize {npc.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h3 className="font-medium mb-4">Preview</h3>
            <div
              className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden"
              onMouseEnter={() => !imageError && setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={
                  isHovering && !imageError ? npc?.animatedImage : npc?.image
                }
                alt={npc?.name}
                className="w-full h-full object-contain transition-opacity duration-300"
                onError={() => {
                  setImageError(true);
                  setIsHovering(false);
                }}
              />
              {isHovering && !imageError && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Hover to animate
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Selected Items Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3">Selected Items</h3>
              <div className="space-y-3">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key}>
                    <h4 className="text-sm font-medium mb-1">
                      {category.name}
                    </h4>
                    {selectedItems[key] ? (
                      <div className="flex items-center justify-between bg-white rounded-md px-3 py-2">
                        <span className="text-sm">
                          {selectedItems[key]!.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                          onClick={() => handleRemoveItem(key)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-white rounded-md px-3 py-2">
                        <span className="text-sm text-gray-400">
                          No {category.name.toLowerCase()} selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                {Object.entries(categories).map(([key, category]) => (
                  <TabsTrigger key={key} value={key}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(customizationItems).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      {categories[category as keyof typeof categories].name}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadCategory(category)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Upload New Item
                    </Button>
                  </div>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-2 gap-4">
                      {items.map((item) => (
                        <TooltipProvider key={item.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className={`p-2 rounded-lg border transition-colors ${
                                  isItemSelected(item)
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => handleItemSelect(item)}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full aspect-square object-contain rounded-md mb-2"
                                />
                                <div className="text-sm font-medium">
                                  {item.name}
                                </div>
                                {item.brands && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.brands.map((brand) => (
                                      <Badge
                                        key={brand}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {brand}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {`Click to ${
                                isItemSelected(item) ? "remove" : "select"
                              } ${item.name}`}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(selectedItems)}>Save Changes</Button>
        </div>

        <UploadDialog
          isOpen={!!uploadCategory}
          onClose={() => setUploadCategory(null)}
          category={uploadCategory || ""}
          onUpload={handleUpload}
        />
      </DialogContent>
    </Dialog>
  );
}
