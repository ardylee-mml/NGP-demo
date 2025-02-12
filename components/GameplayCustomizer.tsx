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
  minigame: GameplayElement;
  initialCustomizations?: Record<string, string>;
  onSave: (customizations: Record<string, string>) => void;
}

export function GameplayCustomizer({
  isOpen,
  onClose,
  minigame,
  initialCustomizations = {},
  onSave,
}: GameplayCustomizerProps) {
  const [customizations, setCustomizations] = useState<Record<string, string>>(
    initialCustomizations
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Customize {minigame.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Preview Panel */}
          <div>
            <h3 className="font-medium mb-4">Preview</h3>
            <div className="aspect-square bg-gray-100 rounded-lg relative">
              <img
                src={minigame.image}
                alt={minigame.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-4">Customizable Elements</h3>
              <div className="space-y-4">
                {minigame.customizableElements.map((element) => (
                  <div key={element.id} className="space-y-2">
                    <Label>{element.name}</Label>
                    <Input
                      value={customizations[element.id] || ""}
                      onChange={(e) =>
                        handleCustomizationChange(element.id, e.target.value)
                      }
                      placeholder={`Enter ${element.name.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(customizations)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
