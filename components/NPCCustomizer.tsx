"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Eye, Plus, Shirt, Footprints, Package, Play, Sparkles, Gamepad, Trophy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ItemUploader } from "./ItemUploader"

interface CustomizationItem {
  id: string
  name: string
  image: string
}

interface SelectedItems {
  clothes: CustomizationItem[]
  shoes: CustomizationItem[]
  items: CustomizationItem[]
  animations: CustomizationItem[]
}

interface NPCCustomizerProps {
  isSelectionArea?: boolean
  className?: string
  selectedItems: SelectedItems
  setSelectedItems: (items: SelectedItems) => void
}

const CUSTOMIZATION_OPTIONS = {
  clothes: [
    { id: 'c1', name: 'Nike Hoodie', image: '/outfits/Nike-hoodie.png' },
    { id: 'c2', name: 'Adidas Sport Shirt', image: '/outfits/White-shirt-Adidas.png' },
    { id: 'c3', name: 'Supreme T-Shirt', image: '/outfits/White-Shirt-Supreme.png' },
    { id: 'c4', name: 'Gucci Jacket', image: '/outfits/Color-jacket-Gucci.png' }
  ],
  shoes: [
    { id: 's1', name: 'Dr. Martens Boots', image: '/outfits/DrMartenBoots.png' },
    { id: 's2', name: 'Nike Air Max', image: '/outfits/MixColor-Nike-AirMax.png' },
    { id: 's3', name: 'Adidas Superstar', image: '/outfits/Red-shoes-Adidas-Superstar.png' }
  ],
  items: [
    { id: 'i1', name: 'Coca-Cola Can', image: '/items/CocaCola.png' },
    { id: 'i2', name: 'Pepsi Bottle', image: '/items/Pepsi.png' },
    { id: 'i3', name: 'Red Bull Energy', image: '/items/Redbull.png' },
    { id: 'i4', name: 'Monster Energy', image: '/items/MonsterEnergy.png' }
  ],
  animations: [
    { id: 'a1', name: 'Dance Move', image: '/animations/hiphop.png' },
    { id: 'a2', name: 'Victory Pose', image: '/animations/Victory.png' },
    { id: 'a3', name: 'Drink Animation', image: '/animations/Drinking.png' }
  ]
} as const

const categoryIcons = {
  clothes: Shirt,
  shoes: Footprints,
  items: Package,
  animations: Play
}

export function NPCCustomizer({ 
  isSelectionArea = false, 
  className = "",
  selectedItems,
  setSelectedItems
}: NPCCustomizerProps) {

  const removeItem = (category: keyof SelectedItems, itemId: string) => {
    setSelectedItems({
      ...selectedItems,
      [category]: selectedItems[category].filter((item) => item.id !== itemId)
    })
  }

  const handleItemSelect = (category: keyof SelectedItems, item: CustomizationItem) => {
    setSelectedItems({
      ...selectedItems,
      [category]: [item]
    })
  }

  const handlePreview = () => {
    // Preview functionality to be implemented
    console.log("Preview:", selectedItems)
  }

  return (
    <Card className={`bg-white border-0 shadow-sm ${className}`}>
      <CardHeader className="border-b border-[#46DFB1]">
        <CardTitle className="text-[#213A58] text-xl font-semibold">
          {isSelectionArea ? "Selected Items" : "Customization Options"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {Object.entries(isSelectionArea ? selectedItems : CUSTOMIZATION_OPTIONS).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {!isSelectionArea && React.createElement(categoryIcons[category as keyof typeof categoryIcons], {
                    className: "h-4 w-4 text-[#15919B]"
                  })}
                  <h3 className="text-[#213A58] font-semibold capitalize">{category}</h3>
                </div>
                {!isSelectionArea && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-[#46DFB1]/20 text-[#15919B]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New {category.charAt(0).toUpperCase() + category.slice(1)}</DialogTitle>
                      </DialogHeader>
                      <ItemUploader
                        category={category as keyof SelectedItems}
                        onItemAdd={(item) => {
                          setSelectedItems({
                            ...selectedItems,
                            [category]: [...selectedItems[category as keyof SelectedItems], item]
                          })
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <div className="min-h-[60px] bg-[#46DFB1]/10 p-2 rounded space-y-2">
                {items.map((item: CustomizationItem) => (
                  <div
                    key={item.id}
                    className={`bg-white p-2 rounded flex items-center justify-between ${
                      !isSelectionArea ? 'cursor-pointer hover:bg-[#46DFB1]/5' : ''
                    }`}
                    onDoubleClick={() => !isSelectionArea && handleItemSelect(category as keyof SelectedItems, item)}
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 mr-2 rounded"
                        draggable="false"
                      />
                      <span className="text-[#213A58]">{item.name}</span>
                    </div>
                    {isSelectionArea && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[#46DFB1]/20 text-[#15919B]"
                        onClick={() => removeItem(category as keyof SelectedItems, item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {isSelectionArea && (
          <Button onClick={handlePreview} className="w-full mt-6 bg-[#15919B] hover:bg-[#0C6478] text-white">
            <Eye className="mr-2 h-4 w-4" /> Preview Character
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

