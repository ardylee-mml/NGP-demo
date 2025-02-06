export interface Game {
  id: string
  name: string
  type: string[]
  features: string[]
  regions: string[]
  audience: {
    ageRange: string
    interests: string[]
  }
  marketingCapabilities: string[]
  image: string
}

export const games: Game[] = [
  {
    id: 'g1',
    name: 'Adventure Quest',
    type: ['RPG', 'Adventure'],
    features: ['Virtual Events', 'Character Customization', 'Social Interaction'],
    regions: ['Asia', 'Europe', 'North America'],
    audience: {
      ageRange: '13-25',
      interests: ['Fantasy', 'Gaming', 'Social']
    },
    marketingCapabilities: ['Brand Integration', 'Virtual Billboards', 'Custom Events'],
    image: '/games/AdventureQuest.png'
  },
  {
    id: 'g2',
    name: 'City Skylines',
    type: ['Simulation', 'Strategy'],
    features: ['Professional Tools', 'Realistic Environment', 'Business Integration'],
    regions: ['Global', 'Europe', 'North America'],
    audience: {
      ageRange: '25-45',
      interests: ['Business', 'Architecture', 'Professional']
    },
    marketingCapabilities: ['Product Placement', 'Professional Showcases', 'Business Events'],
    image: '/games/CitySkylines.png'
  },
  {
    id: 'g3',
    name: 'Rocket League',
    type: ['Sports', 'Racing'],
    features: ['Competitive Play', 'Team-based', 'Esports Ready'],
    regions: ['US', 'Brazil', 'UK', 'Germany', 'France'],
    audience: {
      ageRange: '15-25',
      interests: ['Sports', 'Competition', 'Action']
    },
    marketingCapabilities: ['Sports Brands', 'Energy Drinks', 'Event Promotions'],
    image: '/games/RocketLeague.png'
  },
  {
    id: 'g4',
    name: 'Among Us',
    type: ['Party', 'Social'],
    features: ['Multiplayer', 'Social Deduction', 'Cross-platform'],
    regions: ['US', 'South Korea', 'Brazil', 'Mexico', 'Indonesia'],
    audience: {
      ageRange: '13-30',
      interests: ['Social Gaming', 'Party Games', 'Casual']
    },
    marketingCapabilities: ['Social Media Campaigns', 'Viral Marketing', 'Brand Collaborations'],
    image: '/games/AmongUs.png'
  }
] 