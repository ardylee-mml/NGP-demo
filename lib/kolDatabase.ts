export interface KOL {
  id: string
  name: string
  characterType: string    // e.g., 'Streamer', 'Athlete', 'Artist', 'Influencer'
  appearance: {
    gender: "Male" | "Female" | "Neutral"
    style: string[]        // e.g., 'Casual', 'Sporty', 'Streetwear'
    hairStyle: string
    hairColor: string
    height: "Tall" | "Medium" | "Short"
    features: string[]     // Notable features like 'Glasses', 'Tattoos', etc.
  }
  regions: string[]
  platforms: string[]
  audience: {
    size: string
    ageRange: string
    interests: string[]
  }
  engagementRate: string
  categories: string[]
  previousBrands: string[]
  marketingCapabilities: string[]
  personality: string[]    // e.g., 'Energetic', 'Friendly', 'Professional'
  inspiration: string     // Real-life influencer inspiration
  suitableFor: {
    brands: string[]      // Types of brands this NPC suits
    products: string[]    // Types of products this NPC can promote
    gameTypes: string[]   // Game environments where this NPC works best
  }
  defaultAnimations: string[]  // Default animation sets
  stats: string  // Adding this to maintain existing data
  image: string
  games: string[]
  specialties: string[]
}

export const kols: KOL[] = [
  {
    id: 'k1',
    name: 'TechTrix',
    characterType: 'Streamer',
    appearance: {
      gender: 'Female',
      style: ['Streetwear', 'Tech-wear', 'Urban'],
      hairStyle: 'Neon Purple Bob Cut',
      hairColor: 'Purple',
      height: 'Medium',
      features: ['RGB Glasses', 'Holographic Accessories', 'Tech Tattoos']
    },
    personality: ['Energetic', 'Tech-Savvy', 'Trendy'],
    inspiration: 'Pokimane',
    suitableFor: {
      brands: ['Gaming Peripherals', 'Energy Drinks', 'Tech Gadgets'],
      products: ['Gaming Chairs', 'Headphones', 'Custom PC Builds'],
      gameTypes: ['Esports Arenas', 'Gaming Cafes', 'Tech Conventions']
    },
    defaultAnimations: ['Victory Dance', 'Gaming Pose', 'Energetic Wave'],
    stats: 'Followers: 2.5M, Engagement Rate: 4.8%, Main Platform: Instagram',
    image: '/kols/TechTrix.png',
    regions: ['North America', 'Europe'],
    platforms: ['Twitch', 'YouTube', 'TikTok'],
    audience: {
      size: '2.5M',
      ageRange: '16-24',
      interests: ['Gaming', 'Technology', 'Streaming']
    },
    engagementRate: '4.8%',
    categories: ['Gaming', 'Tech', 'Entertainment'],
    previousBrands: ['Razer', 'Red Bull', 'Intel'],
    marketingCapabilities: [
      'Brand Integration',
      'Live Game Reviews',
      'Tech Unboxing',
      'Gaming Tutorials',
      'Social Media Campaigns'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k2',
    name: 'SportStar',
    characterType: 'Athlete',
    appearance: {
      gender: 'Male',
      style: ['Athletic', 'Sporty', 'Modern'],
      hairStyle: 'Fade Cut',
      hairColor: 'Black',
      height: 'Tall',
      features: ['Athletic Build', 'Sports Accessories', 'Team Jersey']
    },
    personality: ['Competitive', 'Motivational', 'Team Player'],
    inspiration: 'Cristiano Ronaldo',
    suitableFor: {
      brands: ['Sports Apparel', 'Fitness Equipment', 'Health Supplements'],
      products: ['Athletic Shoes', 'Sports Gear', 'Energy Bars'],
      gameTypes: ['Sports Games', 'Training Simulators', 'Competition Venues']
    },
    defaultAnimations: ['Sports Celebration', 'Training Routine', 'Victory Pose'],
    stats: 'Followers: 3.8M, Engagement Rate: 7.2%, Main Platform: TikTok',
    image: '/characters/SportStar-Athlete.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    audience: {
      size: '3.8M',
      ageRange: '18-25',
      interests: ['Sports', 'Fitness', 'Health']
    },
    engagementRate: '7.2%',
    categories: ['Sports', 'Fitness', 'Health'],
    previousBrands: ['Nike', 'Adidas', 'Under Armour'],
    marketingCapabilities: [
      'Brand Endorsements',
      'Fitness Challenges',
      'Sports Events',
      'Training Programs',
      'Product Showcases'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k3',
    name: 'ArtisticSoul',
    characterType: 'Artist',
    appearance: {
      gender: 'Neutral',
      style: ['Artistic', 'Bohemian', 'Creative'],
      hairStyle: 'Colorful Undercut',
      hairColor: 'Rainbow',
      height: 'Medium',
      features: ['Paint Splatter Clothes', 'Digital Tablet', 'Creative Accessories']
    },
    personality: ['Creative', 'Expressive', 'Inspiring'],
    inspiration: 'Digital Art Influencers',
    suitableFor: {
      brands: ['Art Supplies', 'Digital Tools', 'Creative Software'],
      products: ['Drawing Tablets', 'Art Materials', 'Creative Tools'],
      gameTypes: ['Art Studios', 'Creative Spaces', 'Design Workshops']
    },
    defaultAnimations: ['Drawing Pose', 'Creative Expression', 'Artistic Flourish'],
    stats: 'Followers: 5.1M, Engagement Rate: 6.5%, Main Platform: Twitter',
    image: '/characters/ArtisticSoul-Artist.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'YouTube', 'Twitter'],
    audience: {
      size: '5.1M',
      ageRange: '18-25',
      interests: ['Art', 'Design', 'Digital']
    },
    engagementRate: '6.5%',
    categories: ['Art', 'Design', 'Digital'],
    previousBrands: ['Prismacolor', 'Wacom', 'Adobe'],
    marketingCapabilities: [
      'Art Tutorials',
      'Creative Collaborations',
      'Digital Art Showcases',
      'Product Reviews',
      'Live Art Sessions'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k4',
    name: 'StyleIcon',
    characterType: 'Fashion Influencer',
    appearance: {
      gender: 'Female',
      style: ['High Fashion', 'Trendy', 'Luxury'],
      hairStyle: 'Long Wavy',
      hairColor: 'Blonde',
      height: 'Tall',
      features: ['Designer Accessories', 'Premium Outfits', 'Runway Walk']
    },
    personality: ['Sophisticated', 'Trendsetter', 'Charismatic'],
    inspiration: 'Kendall Jenner',
    suitableFor: {
      brands: ['Fashion Brands', 'Luxury Items', 'Beauty Products'],
      products: ['Designer Clothes', 'Accessories', 'Cosmetics'],
      gameTypes: ['Fashion Shows', 'Shopping Centers', 'Beauty Studios']
    },
    defaultAnimations: ['Catwalk', 'Photo Pose', 'Elegant Wave'],
    stats: 'Followers: 4.2M, Engagement Rate: 5.9%, Main Platform: Instagram',
    image: '/characters/StyleIcon-FashionInfluencer.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'TikTok', 'Pinterest'],
    audience: {
      size: '4.2M',
      ageRange: '18-25',
      interests: ['Fashion', 'Beauty', 'Shopping']
    },
    engagementRate: '5.9%',
    categories: ['Fashion', 'Beauty', 'Shopping'],
    previousBrands: ['Gucci', 'Dior', 'Chanel'],
    marketingCapabilities: [
      'Fashion Showcases',
      'Style Tips',
      'Brand Collaborations',
      'Beauty Tutorials',
      'Lifestyle Content'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k5',
    name: 'James Bond',
    characterType: 'Secret Agent',
    appearance: {
      gender: 'Male',
      style: ['Formal', 'Luxury', 'Sophisticated'],
      hairStyle: 'Classic Short',
      hairColor: 'Black',
      height: 'Tall',
      features: ['Suit', 'Refined Posture', 'Classic Watch']
    },
    personality: ['Sophisticated', 'Confident', 'Mysterious'],
    inspiration: 'Daniel Craig as James Bond',
    suitableFor: {
      brands: ['Luxury Cars', 'Designer Suits', 'Premium Watches'],
      products: ['Formal Wear', 'Luxury Accessories', 'High-end Tech'],
      gameTypes: ['Action Games', 'Spy Missions', 'Luxury Settings']
    },
    defaultAnimations: ['Sophisticated Walk', 'Combat Stance', 'Charm Gesture'],
    stats: 'Followers: 2.5M, Engagement Rate: 4.8%, Main Platform: Instagram',
    image: '/characters/JamesBond.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'YouTube', 'LinkedIn'],
    audience: {
      size: '2.5M',
      ageRange: '18-25',
      interests: ['Action', 'Spy', 'Luxury']
    },
    engagementRate: '4.8%',
    categories: ['Action', 'Spy', 'Luxury'],
    previousBrands: ['Bentley', 'Omega', 'Montblanc'],
    marketingCapabilities: [
      'Luxury Brand Integration',
      'Sophisticated Reviews',
      'Premium Events',
      'Style Guides',
      'High-end Promotions'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },

  {
    id: 'k6',
    name: 'ROSE',
    characterType: 'K-pop Star',
    appearance: {
      gender: 'Female',
      style: ['K-pop', 'High Fashion', 'Trendy'],
      hairStyle: 'Long Wavy',
      hairColor: 'Pink',
      height: 'Tall',
      features: ['Stage Outfits', 'Designer Accessories', 'Signature Hair']
    },
    personality: ['Charismatic', 'Energetic', 'Trendsetter'],
    inspiration: 'ROSE from BLACKPINK',
    suitableFor: {
      brands: ['Fashion', 'Beauty', 'Music'],
      products: ['Cosmetics', 'Fashion Items', 'Music Accessories'],
      gameTypes: ['Music Games', 'Dance Games', 'Fashion Shows']
    },
    defaultAnimations: ['Dance Moves', 'Stage Performance', 'Cute Wave'],
    stats: 'Followers: 3.8M, Engagement Rate: 7.2%, Main Platform: TikTok',
    image: '/characters/Rose.png',
    regions: ['Asia', 'North America', 'Europe'],
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    audience: {
      size: '3.8M',
      ageRange: '13-25',
      interests: ['K-pop', 'Fashion', 'Music']
    },
    engagementRate: '7.2%',
    categories: ['K-pop', 'Fashion', 'Music'],
    previousBrands: ["L'Oreal", "Dior", "Blackpink"],
    marketingCapabilities: [
      "Brand Endorsements",
      "Music Promotions",
      "Fashion Collaborations",
      "Social Media Campaigns",
      "Live Performances"
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k7',
    name: 'Eminem',
    characterType: 'Rap Artist',
    appearance: {
      gender: 'Male',
      style: ['Street', 'Hip-hop', 'Urban'],
      hairStyle: 'Short Buzzcut',
      hairColor: 'Blonde',
      height: 'Tall',
      features: ['Casual Streetwear', 'Chain Accessories', 'Signature Hoodie']
    },
    personality: ['Intense', 'Rebellious', 'Authentic'],
    inspiration: 'Eminem',
    suitableFor: {
      brands: ['Urban Wear', 'Music Equipment', 'Street Fashion'],
      products: ['Headphones', 'Streetwear', 'Music Gear'],
      gameTypes: ['Music Games', 'Street Culture', 'Urban Settings']
    },
    defaultAnimations: ['Rap Performance', 'Street Walk', 'Mic Drop'],
    stats: 'Followers: 5.1M, Engagement Rate: 6.5%, Main Platform: Twitter',
    image: '/characters/Eminem.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'Twitter', 'YouTube'],
    audience: {
      size: '5.1M',
      ageRange: '18-25',
      interests: ['Hip-hop', 'Rap', 'Urban']
    },
    engagementRate: '6.5%',
    categories: ['Hip-hop', 'Rap', 'Urban'],
    previousBrands: ['Adidas', 'Apple', 'Pepsi'],
    marketingCapabilities: [
      'Music Promotions',
      'Urban Style Showcases',
      'Brand Collaborations',
      'Live Performances',
      'Social Media Campaigns'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  },
  {
    id: 'k8',
    name: 'Nicki',
    characterType: 'Hip-hop Artist',
    appearance: {
      gender: 'Female',
      style: ['Glamorous', 'Hip-hop', 'Avant-garde'],
      hairStyle: 'Long Colorful',
      hairColor: 'Multi-colored',
      height: 'Medium',
      features: ['Bold Makeup', 'Colorful Wigs', 'Statement Outfits']
    },
    personality: ['Bold', 'Confident', 'Expressive'],
    inspiration: 'Nicki Minaj',
    suitableFor: {
      brands: ['Beauty', 'Fashion', 'Music'],
      products: ['Cosmetics', 'Wigs', 'Fashion Items'],
      gameTypes: ['Music Games', 'Fashion Shows', 'Party Environments']
    },
    defaultAnimations: ['Performance Dance', 'Catwalk', 'Queen Pose'],
    stats: 'Followers: 4.2M, Engagement Rate: 5.9%, Main Platform: Instagram',
    image: '/characters/Nicki.png',
    regions: ['North America', 'Europe'],
    platforms: ['Instagram', 'TikTok', 'Twitter'],
    audience: {
      size: '4.2M',
      ageRange: '18-25',
      interests: ['Hip-hop', 'Fashion', 'Music']
    },
    engagementRate: '5.9%',
    categories: ['Hip-hop', 'Fashion', 'Music'],
    previousBrands: ['MAC', 'Wet n Wild', 'Fenty Beauty'],
    marketingCapabilities: [
      'Music Promotions',
      'Fashion Collaborations',
      'Beauty Endorsements',
      'Live Performances',
      'Brand Partnerships'
    ],
    games: ["Roblox", "Minecraft"],
    specialties: ["Game Reviews", "Live Streaming"]
  }
] 