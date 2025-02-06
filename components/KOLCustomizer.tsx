"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { KOL } from "@/lib/kolDatabase"
import { CustomizationItem, customizationItems, categories } from "@/lib/customizationDatabase"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface KOLCustomizerProps {
  kol: KOL | null
  isOpen: boolean
  onClose: () => void
}

export function KOLCustomizer({ kol, isOpen, onClose }: KOLCustomizerProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, CustomizationItem[]>>({
    clothes: [],
    shoes: [],
    accessories: [],
    animations: [],
  })

  const [activeTab, setActiveTab] = useState('clothes')

  const handleItemSelect = (item: CustomizationItem) => {
    console.log('Selecting item:', item)
    setSelectedItems(prev => ({
      ...prev,
      [item.category]: prev[item.category].includes(item) 
        ? prev[item.category].filter(i => i.id !== item.id)
        : [item] // Only allow one item per category
    }))
  }

  const isItemCompatible = (item: CustomizationItem) => {
    if (!item.compatibility || !kol) return true
    return item.compatibility.includes(kol.characterType)
  }

  if (!kol) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] overflow-hidden flex flex-col" aria-describedby="dialog-description">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Customize {kol.name}</DialogTitle>
          <p id="dialog-description" className="text-sm text-gray-500">
            Customize your KOL's appearance and animations
          </p>
        </DialogHeader>
        
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-2 gap-4 p-1">
            {/* Left Column */}
            <div className="space-y-3">
              {/* KOL Preview */}
              <div className="aspect-square w-4/5 mx-auto rounded-lg bg-[#f5f5f7] flex items-center justify-center">
                <img
                  src={kol.image}
                  alt={kol.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>

              {/* KOL Information */}
              <div className="space-y-2 px-2">
                <div className="border-b pb-1">
                  <h3 className="font-medium text-sm">{kol.name}</h3>
                  <p className="text-xs text-gray-600">{kol.characterType}</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <h4 className="font-medium text-gray-600">Regions</h4>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {kol.regions.map((region) => (
                        <Badge key={region} variant="secondary" className="text-[10px]">{region}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-600">Personality</h4>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {kol.personality.map((trait) => (
                        <Badge key={trait} variant="outline" className="text-[10px]">{trait}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-600">Marketing</h4>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {kol.marketingCapabilities.map((capability) => (
                        <Badge key={capability} variant="secondary" className="text-[10px]">{capability}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="border-l pl-4 space-y-4">
              {/* Selected Items */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200 shadow-sm">
                <h4 className="font-medium text-blue-800 mb-2">Selected Items</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  {Object.entries(selectedItems).map(([category, items]) => (
                    <div key={category} className="flex gap-2">
                      <span className="capitalize font-medium w-24">{category}:</span>
                      <span className="flex-1">{items.length ? items.map(i => i.name).join(", ") : "None"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-1 mb-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                      activeTab === category
                        ? "bg-blue-100 text-blue-800 shadow-sm transform -translate-y-0.5"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-3 gap-2">
                {customizationItems
                  .filter(item => item.category === activeTab)
                  .map((item) => (
                    <TooltipProvider key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => handleItemSelect(item)}
                            className={`group relative p-1.5 rounded-lg text-left transition-all duration-200 ${
                              selectedItems[item.category].includes(item)
                                ? "bg-blue-100 ring-2 ring-blue-500 shadow-md transform -translate-y-0.5"
                                : "bg-gray-50 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-sm"
                            }`}
                          >
                            <div className="aspect-square mb-1 rounded bg-white overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded transition-transform duration-200 group-hover:scale-105"
                              />
                            </div>
                            <div className="text-xs font-medium truncate">
                              {item.name}
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 