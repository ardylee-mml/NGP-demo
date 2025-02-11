"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GameplayElement } from "@/lib/gameplayDatabase";
import { UploadDialog } from "@/components/ui/upload-dialog";
import { X, Plus } from "lucide-react";

interface GameplayCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameplayElement | null;
  initialCustomizations?: Record<string, string>;
  onSave: (customizations: Record<string, string>) => void;
}

export function GameplayCustomizer({
  isOpen,
  onClose,
  game,
  initialCustomizations,
  onSave,
}: GameplayCustomizerProps) {
  const [customizations, setCustomizations] = useState<Record<string, string>>(
    initialCustomizations || {}
  );
  const [uploadElementId, setUploadElementId] = useState<string | null>(null);

  const handleCustomizationChange = (elementId: string, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [elementId]: value,
    }));
  };

  const handleUpload = (data: {
    name: string;
    description: string;
    file: File | null;
  }) => {
    if (uploadElementId && data.file) {
      // Mock implementation - would typically upload file and get URL
      const mockUrl = URL.createObjectURL(data.file);
      handleCustomizationChange(uploadElementId, mockUrl);
    }
    setUploadElementId(null);
  };

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Customize {game.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Preview Panel */}
          <div>
            <h3 className="font-medium mb-4">Preview</h3>
            <div className="aspect-square bg-gray-100 rounded-lg relative">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-4">Customizable Elements</h3>
              <div className="space-y-4">
                {game.customizableElements.map((element) => (
                  <div key={element.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>{element.name}</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadElementId(element.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {element.description}
                    </p>
                    {customizations[element.id] && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white rounded-md px-3 py-2 text-sm">
                          {element.type === "image" ? (
                            <img
                              src={customizations[element.id]}
                              alt={element.name}
                              className="h-8 object-contain"
                            />
                          ) : (
                            customizations[element.id]
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleCustomizationChange(element.id, "")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(customizations)}>Save Changes</Button>
        </div>

        <UploadDialog
          isOpen={!!uploadElementId}
          onClose={() => setUploadElementId(null)}
          category={
            uploadElementId
              ? game.customizableElements.find((e) => e.id === uploadElementId)
                  ?.name || ""
              : ""
          }
          onUpload={handleUpload}
        />
      </DialogContent>
    </Dialog>
  );
}
