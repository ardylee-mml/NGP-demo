"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Plus } from "lucide-react"

interface ItemUploaderProps {
  onItemAdd: (item: { id: string; name: string; image: string }) => void
  category: 'clothes' | 'shoes' | 'items' | 'animations'
}

export function ItemUploader({ onItemAdd, category }: ItemUploaderProps) {
  const [itemName, setItemName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (itemName && previewUrl) {
      onItemAdd({
        id: Date.now().toString(),
        name: itemName,
        image: previewUrl
      })
      // Reset form
      setItemName('')
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id={`file-upload-${category}`}
            />
            <label
              htmlFor={`file-upload-${category}`}
              className="flex items-center gap-2 p-2 border border-dashed border-[#d2d2d7] rounded-lg cursor-pointer hover:bg-[#f5f5f7]"
            >
              <Upload className="h-4 w-4 text-[#86868b]" />
              <span className="text-sm text-[#86868b]">
                {selectedFile ? selectedFile.name : 'Upload image'}
              </span>
            </label>
          </div>
          <Button type="submit" disabled={!itemName || !previewUrl}>
            Add Item
          </Button>
        </div>
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}
      </form>
    </div>
  )
} 