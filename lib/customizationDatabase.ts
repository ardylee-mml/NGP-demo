export interface CustomizationItem {
  id: string
  name: string
  image: string
  category: "clothes" | "shoes" | "accessories" | "animations"
  description?: string
  compatibility?: string[]
}

export const customizationItems: CustomizationItem[] = [
  // Clothes
  {
    id: "c1",
    name: "Gucci Color Jacket",
    image: "/customization/outfits/Color-jacket-Gucci.png",
    category: "clothes",
    description: "Luxary and fashioable everyday wear",
    compatibility: ["Virtual YouTuber", "Lifestyle Influencer"]
  },
  {
    id: "c2",
    name: "Nike Hoodie",
    image: "/customization/outfits/Nike-hoodie.png",
    category: "clothes",
    description: "Nike Brand Comfortable and casual everyday wear",
    compatibility: ["Virtual YouTuber", "Lifestyle Influencer"]
  },
  {
    id: "c3",
    name: "Adidas White T-Shirt",
    image: "/customization/outfits/White-shirt-Adidas.png",
    category: "clothes",
    description: "Adidas Brand Classic casual everyday wear",
    compatibility: ["Fitness and Fashion Influencer", "Gaming Streamer"]
  },
  {
    id: "c4",
    name: "Supreme White T-Shirt",
    image: "/customization/outfits/White-Shirt-Supreme.png",
    category: "clothes",
    description: "Supreme Brand Classic casual everyday wear",
    compatibility: ["Fitness and Fashion Influencer", "Gaming Streamer"]
  },

  // Shoes
  {
    id: "s5",
    name: "Dr Marten Boots",
    image: "/customization/outfits/DrMartenBoots.png",
    category: "shoes",
    description: "Dr Marten Brand Classic design with new color pattern",
    compatibility: ["Fashion Influencer", "Gaming Streamer"]
  },
  {
    id: "s6",
    name: "Nike AirMax",
    image: "/customization/outfits/MixColor-Nike-AirMax.png",
    category: "shoes",
    description: "Nike Brand Classic design with new mixed color pattern",
    compatibility: ["Fashion Influencer", "Gaming Streamer"]
  },
  {
    id: "s7",
    name: "Adidas Superstar",
    image: "/customization/outfits/Red-shoes-Adidas-Superstar.png",
    category: "shoes",
    description: "Adidas Brand Classic Superstar in red color",
  },

  // Accessories
  {
    id: "a1",
    name: "iPhone X",
    image: "/customization/items/iPhone.png",
    category: "accessories",
    description: "Apple Brand iPhone X in silver color",
    compatibility: ["Tech Reviewer", "Business Influencer"]
  },
  {
    id: "a2",
    name: "Switch Game Console",
    image: "/customization/items/SwitchGameDevice.png",
    category: "accessories",
    description: "Nintendo Brand Switch Game Console",
    compatibility: ["Gaming Streamer", "Lifestyle Influencer"]
  },
  {
    id: "a3",
    name: "Coca Cola",
    image: "/customization/items/CocaCola.png",
    category: "accessories",
    description: "Coca Cola in bottle",
    compatibility: ["Virtual YouTuber", "Tech Reviewer"]
  },
  {
    id: "a4",
    name: "Monster Energy Drink",
    image: "/customization/items/MonsterEnergy.png",
    category: "accessories",
    description: "Monster Energy Drink in bottle",
    compatibility: ["Gaming Streamer", "Tech Reviewer"]
  },
  {
    id: "a5",
    name: "Pepsi",
    image: "/customization/items/Pepsi.png",
    category: "accessories",
    description: "Pepsi in bottle",
    compatibility: ["Gaming Streamer", "Tech Reviewer"]
  },
  {
    id: "a6",
    name: "Redbull",
    image: "/customization/items/Redbull.png",
    category: "accessories",
    description: "Redbull in can",
    compatibility: ["Gaming Streamer", "Tech Reviewer"]
  },
  // Animations
  {
    id: "m1",
    name: "APT Dance",
    image: "/customization/animations/apt.png",
    category: "animations",
    description: "Signature APT Dance Animation",
    compatibility: ["Virtual YouTuber", "Lifestyle Influencer"]
  },
  {
    id: "m2",
    name: "Hip-hop Dance",
    image: "/customization/animations/hiphop.png",
    category: "animations",
    description: "Energetic Hip-hop Dance Animation",
    compatibility: ["Virtual YouTuber", "Gaming Streamer"]
  },
  {
    id: "m3",
    name: "K-pop Dance",
    image: "/customization/animations/kpop.png",
    category: "animations",
    description: "K-pop Dance Animation",
    compatibility: ["Virtual YouTuber", "Gaming Streamer"]
  },
  {
    id: "m4",
    name: "Cool dance with Drinking end pose",
    image: "/customization/animations/Drinking.png",
    category: "animations",
    description: "Cool Dance Animation with drinking end pose",
    compatibility: ["Virtual YouTuber", "Gaming Streamer"]
  },
  {
    id: "m5",
    name: "Cool dance with Victory end pose",
    image: "/customization/animations/Victory.png",
    category: "animations",
    description: "Cool Dance Animation with Victory end pose",
    compatibility: ["Virtual YouTuber", "Gaming Streamer"]
  }

]

export const categories = ["clothes", "shoes", "accessories", "animations"] as const

export type CustomizationCategory = typeof categories[number] 