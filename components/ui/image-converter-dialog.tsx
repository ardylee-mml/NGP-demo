"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Loader } from "lucide-react";

type ConversionStep =
  | "idle"
  | "analyzing"
  | "generating"
  | "optimizing"
  | "complete";

interface ImageConverterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageConverterDialog({
  isOpen,
  onClose,
}: ImageConverterDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [conversionStep, setConversionStep] = useState<ConversionStep>("idle");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    // Mock conversion process with steps
    setConversionStep("analyzing");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setConversionStep("generating");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setConversionStep("optimizing");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setConversionStep("complete");

    // Mock download
    const link = document.createElement("a");
    link.download = `${selectedFile.name.split(".")[0]}.fbx`;
    link.href = "#";
    link.click();

    // Reset and close
    setTimeout(() => {
      setConversionStep("idle");
      onClose();
    }, 1000);
  };

  const getStepMessage = () => {
    switch (conversionStep) {
      case "analyzing":
        return "Analyzing image structure...";
      case "generating":
        return "Generating 3D mesh...";
      case "optimizing":
        return "Optimizing for Roblox...";
      case "complete":
        return "Conversion complete!";
      default:
        return "Convert to FBX";
    }
  };

  const isConverting =
    conversionStep !== "idle" && conversionStep !== "complete";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Convert Image to 3D Object</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Upload Area */}
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <FileUp className="h-8 w-8 mx-auto text-blue-500" />
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    Click to select different image
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p>Drag & drop or click to select image</p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {/* Preview Area */}
            <div className="border rounded-lg p-2 bg-gray-50">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image selected
                </div>
              )}
            </div>
          </div>

          {/* Conversion Progress */}
          {conversionStep !== "idle" && (
            <div className="space-y-2">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{
                    width:
                      conversionStep === "complete"
                        ? "100%"
                        : conversionStep === "optimizing"
                        ? "75%"
                        : conversionStep === "generating"
                        ? "50%"
                        : "25%",
                  }}
                />
              </div>
              <p className="text-sm text-center text-gray-600">
                {getStepMessage()}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
            >
              {isConverting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                getStepMessage()
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
