export interface Game {
  id: string
  name: string
  description: string
  genre: string[]
  marketingCapabilities: string[]
  audience: {
    ageRange: string
    interests: string[]
  }
  regions: string[]
  image: string
  metrics: {
    dau: number
    mau: number
    retentionRate: string
    averagePlaytime: string
  }
}

export const games: Game[] = [
  {
    id: '1',
    name: 'Adopt Me!',
    description: 'Popular pet adoption and roleplay game',
    genre: ['Roleplay', 'Social'],
    marketingCapabilities: ['brand awareness', 'product launch', 'engagement'],
    audience: {
      ageRange: '8-16',
      interests: ['pets', 'social', 'collecting']
    },
    regions: ['North America', 'Europe', 'Asia'],
    image: '/games/adopt-me.png',
    metrics: {
      dau: 250000,
      mau: 4500000,
      retentionRate: "45%",
      averagePlaytime: "2.5 hours"
    }
  },
  {
    id: '2',
    name: 'Brookhaven RP',
    description: 'Life simulation and roleplay game',
    genre: ['Roleplay', 'Simulation'],
    marketingCapabilities: ['brand awareness', 'virtual events'],
    audience: {
      ageRange: '10-18',
      interests: ['roleplay', 'social', 'lifestyle']
    },
    regions: ['North America', 'Europe'],
    image: '/games/brookhaven.png',
    metrics: {
      dau: 420000,
      mau: 5800000,
      retentionRate: "52%",
      averagePlaytime: "1.8 hours"
    }
  },
  {
    id: '3',
    name: 'Blox Fruits',
    description: 'Action-adventure fighting game',
    genre: ['Action', 'Adventure'],
    marketingCapabilities: ['product launch', 'engagement'],
    audience: {
      ageRange: '12-20',
      interests: ['anime', 'action', 'competition']
    },
    regions: ['Asia', 'North America'],
    image: '/games/blox-fruits.png',
    metrics: {
      dau: 380000,
      mau: 3900000,
      retentionRate: "48%",
      averagePlaytime: "2.2 hours"
    }
  },
  {
    id: "4",
    name: "Among Us",
    description: "Social deduction multiplayer game set in space",
    genre: ['Party', 'Social'],
    marketingCapabilities: [
      'brand integration',
      'social events',
      'collaborative marketing',
      'in-game cosmetics'
    ],
    audience: {
      ageRange: '10-25',
      interests: ['social gaming', 'party games', 'casual gaming']
    },
    regions: ['North America', 'Europe', 'Asia'],
    image: '/games/AmongUs.png',
    metrics: {
      dau: 310000,
      mau: 4200000,
      retentionRate: "41%",
      averagePlaytime: "1.5 hours"
    }
  },
  {
    id: "5",
    name: "Adventure Quest",
    description: "Fantasy RPG with rich storytelling and customization",
    genre: ['RPG', 'Fantasy'],
    marketingCapabilities: [
      'brand quests',
      'custom items',
      'themed events',
      'character customization'
    ],
    audience: {
      ageRange: '12-24',
      interests: ['fantasy', 'role-playing', 'adventure']
    },
    regions: ['North America', 'Europe'],
    image: '/games/AdventureQuest.png',
    metrics: {
      dau: 180000,
      mau: 2800000,
      retentionRate: "38%",
      averagePlaytime: "1.7 hours"
    }
  },
  {
    id: "6",
    name: "Cities: Skylines",
    description: "Modern city-building and management simulation",
    genre: ['Simulation', 'Strategy'],
    marketingCapabilities: [
      'brand buildings',
      'infrastructure integration',
      'virtual billboards',
      'city events'
    ],
    audience: {
      ageRange: '14-35',
      interests: ['city building', 'strategy', 'management']
    },
    regions: ['North America', 'Europe', 'Asia'],
    image: '/games/CitySkylines.png',
    metrics: {
      dau: 150000,
      mau: 2100000,
      retentionRate: "55%",
      averagePlaytime: "3.2 hours"
    }
  },
  {
    id: "7",
    name: "Rocket League",
    description: "High-powered hybrid of arcade-style soccer and vehicular mayhem",
    genre: ['Sports', 'Action'],
    marketingCapabilities: [
      'vehicle customization',
      'brand sponsorships',
      'esports events',
      'themed arenas'
    ],
    audience: {
      ageRange: '12-30',
      interests: ['sports', 'competitive gaming', 'cars']
    },
    regions: ['North America', 'Europe', 'Asia'],
    image: '/games/RocketLeague.png',
    metrics: {
      dau: 280000,
      mau: 3500000,
      retentionRate: "49%",
      averagePlaytime: "2.1 hours"
    }
  }
] 